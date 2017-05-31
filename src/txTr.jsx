import React from 'react';
import globalStore from './global';

function TxTr(props) {
  const statusTable = {
    ready: 'Ready',
    accepted: 'Accepted',
    rejected: 'Rejected',
    approved: 'Approved',
    destroyed: 'Destroyed',
  };

  return (
    <tr>
      <td>{props.triggerBank}</td>
      <td>{props.receiveBank}</td>
      <td>{props.type === 'SC' ? '代付' : '代收'}</td>
      <td>{props.date}</td>
      <td>{props.amount}</td>
      <td>{statusTable[props.status]}</td>
      <td>{props.txId || 'N/A'}</td>
    </tr>
  );
}

TxTr.propTypes = {
  txId: React.PropTypes.string,
  triggerBank: React.PropTypes.string.isRequired,
  receiveBank: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  amount: React.PropTypes.number.isRequired,
  status: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
};

export default TxTr;
