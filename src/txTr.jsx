import React from 'react';

function TxTr(props) {
  return (
    <tr>
      <td>{props.txId}</td>
      <td>{props.date}</td>
      <td>{props.amount}</td>
      <td>{props.status}</td>
    </tr>
  );
}

TxTr.propTypes = {
  txId: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  status: React.PropTypes.string.isRequired,
};

export default TxTr;
