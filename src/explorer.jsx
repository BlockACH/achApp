/* global $:true*/
import React from 'react';
import ExplorerCell from './explorerCell';
import ExplorerHead from './explorerHead';
import blocksData from '../mock/blocks';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyData: {},
      cellType: 'Transactions',
      pageType: 'Dashboard', // 'Dashboard', 'Block', 'Address', 'Transaction'
      address: '',
      txHash: '',
      blockHash: '',
    };

    this.changePageType = this.changePageType.bind(this);
  }

  changePageType(pageData) {
    this.setState({
      pageType: pageData.pageType,
      cellType: pageData.cellType,
      address: pageData.address,
      txHash: pageData.txHash,
      blockHash: pageData.blockHash,
    });
  }

  renderHead() {
    return this.state.pageType === 'Dashboard' ?
      <ExplorerHead searchBarChange={this.changePageType} /> :
      null;
  }

  renderCells() {
    return this.state.pageType === 'Dashboard' ?
      blocksData.blocks.map(block => (
        <ExplorerCell
          cellType="Blocks"
          timestamp={14000000}
          blockHeight={parseInt(block.height, 10)}
          blockHash={block.hash}
          transactionAmount={parseInt(block.transaction_count, 10)}
          blockSize={parseInt(block.size, 10)}
        />
        )) :
      null;
  }

  render() {
    return (
      <div>
        {this.renderHead()}
        <h1>{this.state.cellType}</h1>
        {this.renderCells()}
      </div>
    );
  }
}

export default Explorer;
