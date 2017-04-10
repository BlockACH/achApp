/* global $:true*/
import React from 'react';
import SettleTr from './settleTr';

class SettleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      defaultTableData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8514/bank/address')
      .then(response => response.json())
      .then((json) => {
        this.setState({ defaultTableData: json.data });
      });
  }

  renderTableBody() {
    return this.state.tableData.length ?
      this.state.tableData.map(tx => (
        <SettleTr
          bankCode={tx.bankCode}
          address={tx.address}
          amount={tx.amount}
        />)) :
      Object.keys(this.state.defaultTableData).map(key =>
        <SettleTr
          bankCode={key}
          address={this.state.defaultTableData[key]}
          amount={0}
        />);
  }

  render() {
    const renderedTableBody = this.renderTableBody();
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2> 清算實況 <small>settlement</small></h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <p className="text-muted font-13 m-b-30">
            票交業務銀行情況
          </p>
          <table id="datatable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>銀行代碼</th>
                <th>銀行地址</th>
                <th>數位貨幣餘額</th>
              </tr>
            </thead>
            <tbody>{renderedTableBody}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SettleTable;
