import React from 'react';
import moment from 'moment';

class ExplorerCell extends React.Component {
  static get propTypes() {
    return {
      cellType: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.number.isRequired,
      // If cellType is transaction
      sourceAddresses: React.PropTypes.array,
      destinationAddresses: React.PropTypes.array,
      amount: React.PropTypes.number,
      // If cellType is block
      blockHeight: React.PropTypes.number,
      blockHash: React.PropTypes.string,
      transactionAmount: React.PropTypes.number,
      blockSize: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      cellType: 'Transactions',
      sourceAddresses: [],
      destinationAddresses: [],
      amount: 0,
      blockHeight: 0,
      blockHash: '',
      blockSize: 0,
      transactionAmount: 0,
    };
  }

  constructor(props) {
    super(props);

    this.renderTxs = this.renderTxs.bind(this);
    this.renderBlocks = this.renderBlocks.bind(this);
  }

  renderBlocks() {
    const dateString = moment.unix(this.props.timestamp).format();
    return (
      <div className="x_panel fixed_height_180">
        <div className="x_title">
          <button
            type="button"
            className="btn btn-round btn-warning"
          >
            {this.props.blockHash}
          </button>
          <h2 className="pull-right">{dateString}</h2>
          <div className="clearfix" />
        </div>
        <button
          type="button"
          className="pull-right btn btn-round btn-primary"
        >
          {this.props.transactionAmount} Transactions
        </button>
        <button
          type="button"
          className="pull-right btn btn-round btn-success"
        >
          {this.props.blockSize} Bytes
        </button>
        <button
          type="button"
          className="pull-right btn btn-round btn-info"
        >
          # {this.props.blockHeight}
        </button>
      </div>
    );
  }

  renderTxs() {
    return (
      <div className="x_panel fixed_height_180">
        <div className="x_title">
          <button
            type="button"
            className="btn btn-round btn-warning"
          >
            43b66168af6fd87fed9e360d83bc87ebc1fce8f91c737c353f986823a7ea32f7
          </button>
          <h2 className="pull-right">02/23/2017 15:18:46</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <div className="col-md-6">
            <a>vbuCzQwZbmk1fV17axgyKCN2VLVm74pdSX</a>
          </div>
          <i className="fa fa-arrow-right" />
          <div className="pull-right">
            <a>bmk1fVpd17axgyKCN2VLVm74vbuCzQwZSX</a>
          </div>
        </div>
        <button
          type="button"
          className="pull-right btn btn-round btn-primary"
        >
          215 Confirmation
        </button>
        <button
          type="button"
          className="pull-right btn btn-round btn-success"
        >
          100 Satoshis
        </button>
      </div>
    );
  }

  render() {
    const renderedCell = this.props.cellType === 'Transactions' ?
      this.renderTxs() : this.renderBlocks();

    return renderedCell;
  }
}

export default ExplorerCell;
