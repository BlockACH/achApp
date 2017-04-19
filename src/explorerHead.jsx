import React from 'react';

class ExplorerHead extends React.Component {
  static get propTypes() {
    return {
      searchBarChange: React.PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const value = e.target.value;
    let pageType;
    let cellType;
    let address;
    let txHash;
    let blockHash;

    if (value.length <= 34) {
      // Value is an address.
      pageType = 'Address';
      cellType = 'Address';
      address = value;
      txHash = '';
      blockHash = '';
    } else if (value.substring(0, 3) === '000') {
      // Value is a block.
      pageType = 'Block';
      cellType = 'Block';
      address = '';
      txHash = '';
      blockHash = value;
    } else {
      // Value is a transaction.
      pageType = 'Transaction';
      cellType = 'Transactions';
      address = '';
      txHash = value;
      blockHash = '';
    }
    console.log('in changeHandler');
    this.props.searchBarChange({
      pageType,
      cellType,
      address,
      txHash,
      blockHash,
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-8 col-sm-8 col-xs-12 form-group pull-right top_search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for block, transaction and address."
              onChange={this.changeHandler}
            >
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">Go!</button>
              </span>
            </input>
          </div>
        </div>
        <div className="x_panel">
          <div className="row tile_count">
            <div className="col-md-4 col-sm-8 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fa fa-clock-o" /> Best Blocks</span>
              <div className="count">29</div>
              <span className="count_bottom"> block #</span>
            </div>
            <div className="col-md-4 col-sm-8 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fa fa-clock-o" /> Last Blocks</span>
              <div className="count">29 </div>
              <span className="count_bottom">sec ago</span>
            </div>
            <div className="col-md-4 col-sm-8 col-xs-12 tile_stats_count">
              <span className="count_top"><i className="fa fa-user" /> Difficulty</span>
              <div className="count red">31.03</div>
              <span className="count_bottom"><i className="red">TH </i></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExplorerHead;
