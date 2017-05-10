import React from 'react';
import globalStore from './global';
import { getJson, postJson } from './apiClient';

class TriggerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historyData: {},
    };

    this.getHistoryData = this.getHistoryData.bind(this);
    this.submit = this.submit.bind(this);
  }

  getHistoryData(txType) {
    const url = `${globalStore.getBaseUrl()}/history-data/collect?txtype=${txType}`;
    getJson(url).then((json) => {
      this.setState({ historyData: json.data });
    });
  }

  submit(e) {
    e.preventDefault();
    const url = `${globalStore.getBaseUrl()}/transactions/ready`;
    const data = {
      trigger_bank: globalStore.bank,
      receive_bank: this.state.receiveBank,
      type: this.state.type,
      amount: this.state.amount,
    };
    postJson(url, data).then((json) => {
      console.log('submit:', json.data);
      alert('已發動！');
    });
  }

  render() {
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2> 發動 <small>ACH</small></h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <form
            className="form-horizontal form-label-left"
            onSubmit={this.submit}
          >
            <span className="section">發動交易資料</span>
            <div className="item form-group">
              <label
                className="control-label col-md-3 col-sm-3 col-xs-12"
                htmlFor="trigger-bank"
              >
              發動行
              <span className="required">*</span>
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <input
                  id="trigger-bank"
                  className="form-control col-md-7 col-xs-12"
                  data-validate-length-range={6}
                  data-validate-words={2}
                  name="trigger-bank"
                  required="required"
                  type="text"
                  value={globalStore.bank}
                  readOnly
                />
              </div>
            </div>
            <div className="item form-group">
              <label
                className="control-label col-md-3 col-sm-3 col-xs-12"
                htmlFor="receive-bank"
              >
              收受行
              <span className="required">*</span>
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="text"
                  id="receive-bank"
                  name="receive-bank"
                  required="required"
                  className="form-control col-md-7 col-xs-12"
                  value={this.state.historyData.receive_bank}
                  onChange={(e) => { this.setState({ receiveBank: e.target.value }); }}
                />
              </div>
            </div>
            <div className="item form-group">
              <label
                className="control-label col-md-3 col-sm-3 col-xs-12"
                htmlFor="tx-type"
              >
              交易類別（代收、代付）
              <span className="required">*</span>
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="text"
                  id="tx-type"
                  name="tx-type"
                  required="required"
                  className="form-control col-md-7 col-xs-12"
                  value={this.state.historyData.tx_type}
                  onChange={(e) => {
                    const rawType = e.target.value;
                    let type = null;
                    if (rawType === '代付') {
                      type = 'SC';
                    } else if (rawType === '代收') {
                      type = 'SD';
                    }
                    this.setState({ type });
                  }}
                />
              </div>
            </div>
            <div className="item form-group">
              <label
                className="control-label col-md-3 col-sm-3 col-xs-12"
                htmlFor="amount"
              >
              交易金額
              <span className="required">*</span>
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  required="required"
                  data-validate-minmax="0,10000000000000"
                  className="form-control col-md-7 col-xs-12"
                  value={this.state.historyData.amount}
                  onChange={(e) => {
                    this.setState({ amount: parseInt(e.target.value, 10) });
                  }}
                />
              </div>
            </div>
            <div className="ln_solid" />
            <div className="form-group">
              <div className="col-md-6 col-md-offset-3">
                <button id="cancel" type="reset" className="btn btn-primary">Cancel</button>
                <button id="send" type="submit" className="btn btn-success">Submit</button>
                <button
                  id="history-collect"
                  type="button"
                  className="btn btn-dark"
                  onClick={() => this.getHistoryData('SD')}
                >
                  歷史代收資料
                </button>
                <button
                  id="history-pay"
                  type="button"
                  className="btn btn-dark"
                  onClick={() => this.getHistoryData('SC')}
                >
                  歷史代付資料
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TriggerForm;
