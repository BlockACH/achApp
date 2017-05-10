import React from 'react';
import { postJson } from './apiClient';

class Tr extends React.Component {
  changeTxStatus(url, txKey) {
    const data = { key: txKey };
    if (txKey !== 'undefined') {
      postJson(url, data).then((json) => {
        console.log('accpetted tx:', json.data);
        this.props.removeTx(txKey);
      });
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.pbank}</td>
        <td>{this.props.rbank}</td>
        <td>{this.props.type}</td>
        <td>{this.props.amount}</td>
        <td>
          <button
            className="btn btn-info btn-xs"
            type="button"
            onClick={() => this.changeTxStatus(this.props.acceptUrl, this.props.txKey)}
          >
            <i className="fa fa-pencil" /> 同意
          </button>
          <button
            className="btn btn-danger btn-xs"
            type="button"
            onClick={() => this.changeTxStatus(this.props.rejectUrl, this.props.txKey)}
          >
            <i className="fa fa-trash-o" /> 拒絕
          </button>
        </td>
      </tr>
    );
  }
}

Tr.propTypes = {
  pbank: React.PropTypes.string.isRequired,
  rbank: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  txKey: React.PropTypes.string.isRequired,
  acceptUrl: React.PropTypes.string.isRequired,
  rejectUrl: React.PropTypes.string.isRequired,
  removeTx: React.PropTypes.func.isRequired,
};

export default Tr;
