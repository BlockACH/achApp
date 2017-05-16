/* global $:true*/
import React from 'react';
import TxTr from './txTr';
import globalStore from './global';
import { getJson } from './apiClient';

class TxTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    };

    this.renderTxTrs = this.renderTxTrs.bind(this);
  }

  componentDidMount() {
    // $('#datatable').dataTable();
    const url = `${globalStore.getBaseUrl()}/transactions/query`;
    getJson(url).then((json) => {
      this.setState({ tableData: json.data });
    });
  }

  renderTxTrs() {
    return this.state.tableData.length ? this.state.tableData.map(tx => (
      <TxTr
        date={tx.created_time}
        triggerBank={tx.trigger_bank}
        receiveBank={tx.receive_bank}
        amount={tx.amount}
        status={tx.status}
        txId={tx.txid}
      />
    )) : null;
  }

  render() {
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2> 交易列表 <small>ACH transactions</small></h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <p className="text-muted font-13 m-b-30">
            票交業務交易
          </p>
          <table id="datatable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>發動行</th>
                <th>收受行</th>
                <th>交易日期</th>
                <th>金額</th>
                <th>交易狀態</th>
                <th>Tx Id</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTxTrs()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TxTable;
