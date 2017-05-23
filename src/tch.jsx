import React from 'react';
import CheckTxList from './checkTxList';
import globalStore from './global';
import { postJson } from './apiClient';

class TchPage extends React.Component {
  static settle() {
    const url = `${globalStore.getBaseUrl()}/batch_settle`;

    postJson(url, {}).then((json) => {
      console.log('submit:', json.data);
      alert('已發動清算');
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      bank: '',
      amount: 0,
    };
    this.mint = this.mint.bind(this);
  }

  mint(e) {
    e.preventDefault();
    const url = `${globalStore.getBaseUrl()}/mint`;
    const data = {
      bank: this.state.bank,
      amount: this.state.amount,
    };

    postJson(url, data).then((json) => {
      console.log('submit:', json.data);
      alert('模擬匯錢完成！');
    });
  }

  render() {
    if (globalStore.bank === 'TCH') {
      if (globalStore.model === 'settle') {
        return (
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <CheckTxList
                title="TCH 審核"
                subtitle="待 TCH 審核交易"
                acceptUrl={`${globalStore.getBaseUrl()}/transactions/approve`}
                rejectUrl={`${globalStore.getBaseUrl()}/transactions/destroy`}
                fetchTxsUrl={`${globalStore.getBaseUrl()}/transactions/query?s=accepted`}
              />
            </div>
          </div>
        );
      } else if (globalStore.model === 'smart_contract') {
        return (
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2> 混合清算之 Queue 交易清算 </h2>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{
                      marginLeft: 20,
                    }}
                    onClick={TchPage.settle}
                  >
                    Settle
                  </button>
                  <div className="clearfix" />
                </div>

              </div>

              <div className="x_panel">
                <div className="x_title">
                  <h2> 鑄幣至銀行 </h2>
                  <div className="clearfix" />
                </div>
                <div className="x_content">
                  <form
                    id="login-form"
                    data-parsley-validate
                    className="form-horizontal form-label-left"
                    onSubmit={this.mint}
                  >
                    <div className="form-group">
                      <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="bank">
                        Bank <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <input
                          id="bank"
                          className="form-control col-md-7 col-xs-12"
                          name="bank"
                          required="required"
                          type="text"
                          onChange={(e) => { this.setState({ bank: e.target.value }); }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="bank">
                        Amount <span className="required">*</span>
                      </label>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <input
                          id="amount"
                          className="form-control col-md-7 col-xs-12"
                          name="amount"
                          required="required"
                          type="number"
                          onChange={(e) => {
                            this.setState({ amount: parseInt(e.target.value, 10) });
                          }}
                        />
                      </div>
                    </div>
                    <div className="ln_solid" />
                    <div className="form-group">
                      <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                        <button className="btn btn-primary" type="reset">Reset</button>
                        <button type="submit" className="btn btn-success">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <h2> 權限不符，請以 TCH 身份登入！ </h2>
        </div>
      </div>
    );
  }
}

export default TchPage;
