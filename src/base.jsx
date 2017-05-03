/* global $:true*/

import React from 'react';
import ReactDom from 'react-dom';
import TriggerPage from './trigger';
import RecievePage from './recieve';
import TchPage from './tch';
import TxListPage from './txList';
import SettlePage from './settle';
import ExplorerPage from './explorer';
import globalStore from './global';

class ContentHandler extends React.Component {
  static defaultState() {
    return {
      page: null,
      currentBank: '',
      bankPort: '',
      model: 'settle',
      isLogin: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = ContentHandler.defaultState();
    this.currentBankOnChange = this.currentBankOnChange.bind(this);
    this.bankPortOnChange = this.bankPortOnChange.bind(this);
    this.modelOnChange = this.modelOnChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  logout() {
    this.setState(ContentHandler.defaultState());
    $('#current-user').text('ACH');
  }

  clickLogin(e) {
    e.preventDefault();
    $('#current-user').text(this.state.currentBank);
    globalStore.bank = this.state.currentBank;
    globalStore.port = this.state.bankPort;
    globalStore.model = this.state.model;
    this.setState({
      page: <TriggerPage />,
      isLogin: true,
    });
  }

  currentBankOnChange(e) {
    const value = e.target.value;
    this.setState({ currentBank: value });
  }

  bankPortOnChange(e) {
    const value = e.target.value;
    this.setState({ bankPort: value });
  }

  modelOnChange(e) {
    const value = e.target.value;
    this.setState({ model: value });
  }

  render() {
    if (this.state.isLogin && React.isValidElement(this.state.page)) {
      return this.state.page;
    }

    return (
      <div className="x_panel">
        <div className="x_title">
          <h2>歡迎來到媒體交換業務 </h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <form
            id="login-form"
            data-parsley-validate
            className="form-horizontal form-label-left"
            onSubmit={this.clickLogin}
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
                  onChange={this.currentBankOnChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <input
                  id="password"
                  className="form-control col-md-7 col-xs-12"
                  name="password"
                  required="required"
                  type="password"
                  onChange={this.bankPortOnChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="models">
                Model *
              </label>
              <div className="col-md-6 col-sm-6 col-xs-12" onChange={this.modelOnChange}>
                  Model 1: &nbsp;
                  <input
                    type="radio"
                    className="flat"
                    name="model"
                    id="model1"
                    defaultValue="settle"
                    defaultChecked
                    required
                  />
                  &nbsp;
                  Model 2: &nbsp;
                  <input
                    type="radio"
                    className="flat"
                    name="model"
                    id="model2"
                    defaultValue="smart_contract"
                  />
              </div>
            </div>
            <div className="ln_solid" />
            <div className="form-group">
              <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                <button className="btn btn-primary" type="reset">Reset</button>
                <button type="submit" className="btn btn-success">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const pageContent = ReactDom.render(<ContentHandler />, document.getElementById('page-content'));


// Side bar components uses 'custom.js' in this template
// It's too hard to refactor it to pure react style here
// Thus use Jquery to bind onclick event on those elements
// and keep those components stay defined in html
$(document).ready(() => {
  $('#site-title, #logout').on('click', () => {
    pageContent.logout();
  });

  $('#trigger').on('click', () => {
    pageContent.setState({
      page: <TriggerPage />,
    });
  });

  $('#recieve').on('click', () => {
    pageContent.setState({
      page: <RecievePage />,
    });
  });

  $('#tch-check').on('click', () => {
    pageContent.setState({
      page: <TchPage />,
    });
  });

  $('#tx-list').on('click', () => {
    pageContent.setState({
      page: <TxListPage />,
    });
  });

  $('#settle').on('click', () => {
    pageContent.setState({
      page: <SettlePage />,
    });
  });

  $('#explorer').on('click', () => {
    pageContent.setState({
      page: <ExplorerPage />,
    });
  });
});
