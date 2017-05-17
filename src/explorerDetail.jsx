import React from 'react';
import moment from 'moment';

import globalStore from './global';
import { getJson } from './apiClient';

class ExplorerCell extends React.Component {
  static get propTypes() {
    return {
      detailType: React.PropTypes.string.isRequired,
      txHash: React.PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      detailType: 'Transaction',
      timestamp: 1450000000,
      txHash: '',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      opReturns: [],
      detailData: {},
    };
    this.renderTxDetail = this.renderTxDetail.bind(this);
    this.renderFlowDetail = this.renderFlowDetail.bind(this);
  }

  componentDidMount() {
    const txUrs = `${globalStore.getExplorerBaseUrl()}/explorer/v1/transactions/${this.props.txHash}`;
    getJson(txUrs).then((json) => {
      this.setState({ detailData: json.tx });
    });
  }

  getVioSum(option) {
    let vs;
    let sum = 0;
    if (option === 'vins') vs = this.state.detailData.vins;
    else if (option === 'vouts') vs = this.state.detailData.vouts;
    if (!vs) vs = [];
    for (let i = 0; i < vs.length; i += 1) {
      if (parseInt(vs[i].color, 10) === 2) sum += parseFloat(vs[i].amount, 10);
    }
    return sum / 1e8;
  }

  getFee() {
    let fee;
    const vins = this.state.detailData.vins || [];
    vins.map((v) => {
      if (parseInt(v.color, 10) === 1) {
        fee = parseInt(v.amount, 10) / 1e8;
      }
      return 0;
    });
    return fee;
  }

  renderOpReturns() {
    return this.state.opReturns.map(opReturn => (
      <tr>
        <th scope="row">OP_RETURN</th>
        <td>{opReturn}</td>
      </tr>
    ));
  }

  renderTxDetail() {
    const {
      hash,
      type,
      time,
      confirmation,
    } = this.state.detailData;

    const dateString = moment.unix(time).format();
    return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <h2>Detail</h2>
            <div className="clearfix" />
          </div>
          <div className="x_content">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>{hash}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Time</th>
                  <td>{dateString}</td>
                </tr>
                <tr>
                  <th scope="row">Sum of outgoing txs</th>
                  <td>{this.getVioSum('vouts')}</td>
                </tr>
                <tr>
                  <th scope="row">Traded</th>
                  <td>{this.getVioSum('vouts')}</td>
                </tr>
                <tr>
                  <th scope="row">Fee</th>
                  <td>{this.getFee()}</td>
                </tr>
                <tr>
                  <th scope="row">Confirmations</th>
                  <td>{confirmation}</td>
                </tr>
                <tr>
                  <th scope="row">Type</th>
                  <td>{type}</td>
                </tr>
                <tr>
                  <th scope="row">Block Hash</th>
                  <td>{this.state.detailData.block_hash}</td>
                </tr>
                {this.renderOpReturns()}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    );
  }

  renderFlowVins() {
    const vins = this.state.detailData.vins || [];
    return vins.length ? vins.map(vin => (
      <div>
        <a>{vin.address}</a>
        {parseInt(vin.color, 10) === 1 ? (
          <b className="pull-right green">{parseFloat(vin.amount, 10) / 1e8}</b>
        ) : (
          <b className="pull-right">{parseFloat(vin.amount, 10) / 1e8}</b>
        )}
      </div>
    )) : null;
  }

  renderFlowVouts() {
    const vouts = this.state.detailData.vouts || [];
    return vouts.length ? vouts.map(vout => (
      <div>
        <a>{vout.address}</a>
        <b
          className="pull-right"
          style={{ 'margin-left': '30px' }}
        >
          {parseFloat(vout.amount, 10) / 1e8}
        </b>
      </div>
    )) : null;
  }

  renderFlowDetail() {
    const dateString = moment.unix(this.state.detailData.time).format();
    return (
      <div className="x_panel fixed_height_180">
        <div className="x_title">
          <button
            type="button"
            className="btn btn-round btn-warning"
          >
            {this.state.detailData.hash}
          </button>
          <h2 className="pull-right">{dateString}</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <div className="col-md-6">
            {this.renderFlowVins()}
          </div>
          <i className="fa fa-arrow-right" />
          <div className="pull-right">
            {this.renderFlowVouts()}
          </div>
        </div>
        <button
          type="button"
          className="pull-right btn btn-round btn-primary"
        >
          {this.state.detailData.confirmation} Confirmation
        </button>
        <button
          type="button"
          className="pull-right btn btn-round btn-success"
        >
          {this.getVioSum('vouts')} Satoshis
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTxDetail()}
        {this.renderFlowDetail()}
      </div>
    );
  }
}

export default ExplorerCell;
