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

  renderFlowDetail() {
    return (
      <div className="x_panel fixed_height_180">
        <div className="x_title">
          <button
            type="button"
            className="btn btn-round btn-warning"
          >
            43b66168af6fd87fed9e360d83bc87ebc1fce8f91c737c353f986823a7ea32f7
          </button>
          <h2 className="pull-right">02/23/2017 15:18:46</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <div className="col-md-6">
            <a>vbuCzQwZbmk1fV17axgyKCN2VLVm74pdSX</a>
          </div>
          <i className="fa fa-arrow-right" />
          <div className="pull-right">
            <a>bmk1fVpd17axgyKCN2VLVm74vbuCzQwZSX</a>
          </div>
        </div>
        <button
          type="button"
          className="pull-right btn btn-round btn-primary"
        >
          215 Confirmation
        </button>
        <button
          type="button"
          className="pull-right btn btn-round btn-success"
        >
          100 Satoshis
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
