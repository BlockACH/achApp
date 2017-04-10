/* global $:true*/
import React from 'react';
import ExplorerCell from './explorerCell';
import ExplorerHead from './explorerHead';
import blocksData from './blocks';

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

  componentDidMount() {
    console.log('componentDidMount!');
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

  renderBlocks() {
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
    const renderedHead = this.renderHead();
    const renderedCells = this.renderBlocks();
    return (
      <div>
        {renderedHead}
        <h1>{this.state.cellType}</h1>
        {renderedCells}
        {/* <ExplorerCell
          cellType={this.state.cellType}
          timestamp={14000000}
        />
        <ExplorerCell
          cellType="Transactions"
          timestamp={14000000}
        /> */}
      </div>
    );
  }
}

export default Explorer;
