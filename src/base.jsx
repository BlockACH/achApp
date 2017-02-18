/* global $:true*/

import React from 'react';
import ReactDom from 'react-dom';
import TriggerPage from './trigger';
import RecievePage from './recieve';
import TchPage from './tch';
import TxListPage from './txList';
import SettlePage from './settle';

class ContentHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
    };
  }

  render() {
    if (React.isValidElement(this.state.page)) {
      return this.state.page;
    }

    return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <h2> 歡迎來到票交業務系統 </h2>
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
});
