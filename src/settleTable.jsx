/* global $:true*/
import React from 'react';
import SettleTr from './settleTr';
import bankList from '../mock/bankList';

class SettleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      defaultTableData: [],
      startDate: '',
      endDate: '',
    };

    this.startDataOnChange = this.startDataOnChange.bind(this);
    this.endDataOnChange = this.endDataOnChange.bind(this);
    this.dbSettleRequest = this.dbSettleRequest.bind(this);
    this.handleBankResultData = this.handleBankResultData.bind(this);
  }

  componentDidMount() {
    fetch('http://ach.csie.org:8514/bank/address')
      .then(response => response.json())
      .then((json) => {
        this.setState({ defaultTableData: json.data });
      });
  }

  startDataOnChange(e) {
    const value = e.target.value;
    this.setState({ startDate: value });
  }

  endDataOnChange(e) {
    const value = e.target.value;
    this.setState({ endDate: value });
  }

  handleBankResultData(tableData) {
    const tableBankList = Object.keys(tableData);
    const handledData = {};
    for (let i = 0; i < tableBankList.length; i += 1) {
      const bank = tableBankList[i];
      if (bankList.indexOf(bank) > -1) {
        handledData[bank] = tableData[bank];
      } else {
        handledData.EA0 += tableData[bank];
      }
    }
    return handledData;
  }

  dbSettleRequest() {
    console.log('Click dbSettleRequest!');
    console.log(JSON.stringify(this.state, null, 4));
    const baseUrl = 'http://ach.csie.org:8514/settlement/db';
    const params = `?start=${this.state.startDate}&end=${this.state.endDate}`;

    fetch(`${baseUrl}${params}`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ tableData: json.data });
        console.log('TableData set!');
      });
  }

  renderTableBody() {
    return Object.keys(this.state.tableData).length ?
      Object.keys(this.handleBankResultData(this.state.tableData)).map(key => (
        <SettleTr
          bankCode={key}
          address={this.state.defaultTableData[key]}
          amount={this.state.tableData[key]}
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
          <h2> 清算實況 </h2>
          <button
            id="history-collect"
            type="button"
            className="btn btn-dark"
            style={{ float: 'right' }}
            onClick={this.dbSettleRequest}
          >
            單日自動清算
          </button>
          <input
            id="end-date"
            className="form-control col-md-3 col-xs-6"
            name="end-date"
            required="required"
            type="text"
            placeholder="end"
            style={{ width: '150px', marginRight: '10px', float: 'right' }}
            onChange={this.endDataOnChange}
          />
          <input
            id="start-date"
            className="form-control col-md-3 col-xs-6"
            name="start-date"
            required="required"
            type="text"
            placeholder="start"
            style={{ width: '150px', marginRight: '10px', float: 'right' }}
            onChange={this.startDataOnChange}
          />
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
