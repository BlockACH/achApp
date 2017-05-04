import React from 'react';
import Loading from 'react-component-loading';

import SettleTr from './settleTr';
import bankList from '../mock/bankList';
import globalStore from './global';
import { getJson } from './apiClient';

class SettleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      defaultTableData: [],
      startDate: '01050601',
      endDate: '01050602',
      isLoading: false,
    };

    this.startDataOnChange = this.startDataOnChange.bind(this);
    this.endDataOnChange = this.endDataOnChange.bind(this);
    this.dbSettleRequest = this.dbSettleRequest.bind(this);
    this.handleBankResultData = this.handleBankResultData.bind(this);
  }

  componentDidMount() {
    const url = `${globalStore.getBaseUrl()}/bank/address`;
    getJson(url).then((json) => {
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
    const handledData = {
      EA0: 0,
    };
    for (let i = 0; i < tableBankList.length; i += 1) {
      const bank = tableBankList[i];
      if (bankList.indexOf(bank) > -1) {
        handledData[bank] = tableData[bank];
      } else {
        handledData.EA0 += tableData[bank];
      }
    }
    console.log(JSON.stringify(handledData, null, 4));
    return handledData;
  }

  dbSettleRequest() {
    console.log('Click dbSettleRequest!');
    const params = `start=${this.state.startDate}&end=${this.state.endDate}`;
    const url = `${globalStore.getBaseUrl()}/db?${params}`;
    this.setState({ isLoading: true });
    getJson(url).then((json) => {
      this.setState({ tableData: json.data });
      this.setState({ isLoading: false });
      console.log('TableData set!');
    });
  }

  renderTableBody() {
    const handledData = this.handleBankResultData(this.state.tableData);
    return Object.keys(this.state.tableData).length ?
      Object.keys(handledData).map(key => (
        <SettleTr
          key={key}
          bankCode={key}
          address={this.state.defaultTableData[key]}
          amount={handledData[key]}
        />)) :
      Object.keys(this.state.defaultTableData).map(key =>
        <SettleTr
          key={key}
          bankCode={key}
          address={this.state.defaultTableData[key]}
          amount={0}
        />);
  }

  renderLoadingAnimation() {
    return this.state.isLoading ?
      (
        <div style={{ marginLeft: '100px', marginTop: '10px' }}>
          <Loading
            type="square-arrange"
            color="#2A3F54"
            width="40"
            height="26"
          />
        </div>
      ) : null;
  }

  render() {
    const renderedTableBody = this.renderTableBody();
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2> 清算實況 </h2>
          {this.renderLoadingAnimation()}
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
