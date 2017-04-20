/* global $:true*/

import React from 'react';
import ReactDom from 'react-dom';
import TriggerPage from './trigger';
import RecievePage from './recieve';
import TchPage from './tch';
import TxListPage from './txList';
import SettlePage from './settle';
import ExplorerPage from './explorer';

class ContentHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      currentBank: '',
      bankPort: '',
    };
    this.currentBankOnChange = this.currentBankOnChange.bind(this);
    this.bankPortOnChange = this.bankPortOnChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  clickLogin() {
    $('#current-user').text(this.state.currentBank);
    $('#bank-port').text(this.state.bankPort);
  }

  currentBankOnChange(e) {
    const value = e.target.value;
    this.setState({ currentBank: value });
  }

  bankPortOnChange(e) {
    const value = e.target.value;
    this.setState({ bankPort: value });
  }

  render() {
    if (React.isValidElement(this.state.page)) {
      return this.state.page;
    }

    return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <h2> 歡迎來到媒體交換業務 </h2>
        <input
          id="username"
          className="form-control"
          name="username"
          placeholder="username"
          required="required"
          type="text"
          style={{ width: '20%' }}
          onChange={this.currentBankOnChange}
        />
        <input
          id="password"
          className="form-control"
          name="password"
          placeholder="password"
          required="required"
          type="password"
          style={{ width: '20%' }}
          onChange={this.bankPortOnChange}
        />
        <button
          style={{ margin: '10px 0 0 10px' }}
          onClick={this.clickLogin}
        >
          Login
        </button>
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
