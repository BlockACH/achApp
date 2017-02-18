/* global $:true*/
import React from 'react';
import TxTr from './txTr';

class TxTable extends React.Component {
  componentDidMount() {
    $('#datatable').dataTable();
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
                <th>Tx Id</th>
                <th>交易日期</th>
                <th>金額</th>
                <th>交易狀態</th>
              </tr>
            </thead>
            <tbody>
              <TxTr
                txId="51b78168d94ec307e2855697209275d477e05d8647caf29cb9e38fb6a4661145"
                date="2017-02-16"
                amount={100000}
                status="代收確認中"
              />
              <TxTr
                txId="647caf29cb9e38fb6a451b78168d94ec307e2855697209275d477e05d8661145"
                date="2017-02-16"
                amount={121300}
                status="交付TCH確認"
              />
              <TxTr
                txId="d8647caf29cb9e38fb6a51b78168d94ec30775d477e054661145e28556972092"
                date="2017-02-16"
                amount={9810}
                status="已完成"
              />
              <TxTr
                txId="e2855697209275d477e05d8647caf29cb9e38fb6a466114551b78168d94ec307"
                date="2017-02-16"
                amount={781900}
                status="已拒絕"
              />
              <TxTr
                txId="51b78168209275d477e05d8647caf29cb9e38fb6a4661145d94ec307e2855697"
                date="2017-02-16"
                amount={10}
                status="代收確認中"
              />
              <TxTr
                txId="05d8647caf29cb9e38fb6a466114551b78168d94ec307e2855697209275d477e"
                date="2017-02-16"
                amount={700}
                status="已完成"
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TxTable;
