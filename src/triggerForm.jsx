/* global $:true*/

import React from 'react';

class TriggerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: null,
      historyData: {},
    };

    this.getHistoryData = this.getHistoryData.bind(this);
  }

  getHistoryData(txType) {
    const port = $('#bank-port').html();
    fetch(`http://ach.csie.org:${port}/history-data/collect?txtype=${txType}`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ historyData: json.data });
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
          <form className="form-horizontal form-label-left" >
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
                  required="required" type="text"
                  value={this.state.historyData.trigger_bank}
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
                />
              </div>
            </div>
            <div className="item form-group">
              <label
                className="control-label col-md-3 col-sm-3 col-xs-12"
                htmlFor="tx-type"
              >
              交易類別（代收、代付、代收退件、代付退件）
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
                />
              </div>
            </div>
            <div className="ln_solid" />
            <div className="form-group">
              <div className="col-md-6 col-md-offset-3">
                <button id="cancel" type="button" className="btn btn-primary">Cancel</button>
                <button id="send" type="button" className="btn btn-success">Submit</button>
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
