import React from 'react';
import Tr from './checkTxTr';
import { getJson } from './apiClient';

class CheckTxList extends React.Component {
  static get propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      subtitle: React.PropTypes.string.isRequired,
      acceptUrl: React.PropTypes.string.isRequired,
      rejectUrl: React.PropTypes.string.isRequired,
      fetchTxsUrl: React.PropTypes.string.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      txs: [],
    };
    this.removeTx = this.removeTx.bind(this);
  }

  componentDidMount() {
    getJson(this.props.fetchTxsUrl).then((json) => {
      this.setState({ txs: json.data });
    });
  }

  removeTx(txKey) {
    const txs = this.state.txs;
    this.setState({
      txs: txs.filter(tx => tx.key !== txKey),
    });
  }

  render() {
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2>{this.props.title}</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <p>{this.props.subtitle}</p>
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th>發動行</th>
                <th>收受行</th>
                <th>交易類別</th>
                <th>金額</th>
                <th style={{ width: '30%' }}>###</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.txs.map(tx =>
                  <Tr
                    key={tx.key}
                    pbank={tx.trigger_bank}
                    rbank={tx.receive_bank}
                    type={(tx.type === 'SD') ? '代收' : '代付'}
                    status={tx.status}
                    amount={tx.amount}
                    txKey={tx.key}
                    acceptUrl={this.props.acceptUrl}
                    rejectUrl={this.props.rejectUrl}
                    removeTx={this.removeTx}
                  />,
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CheckTxList;
