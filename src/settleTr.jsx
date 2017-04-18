import React from 'react';

function SettleTr(props) {
  return (
    <tr>
      <td>{props.bankCode}</td>
      <td>{props.address}</td>
      <td className={props.amount < 1000 ? 'red' : ''}>{props.amount}</td>
    </tr>
  );
}

SettleTr.propTypes = {
  bankCode: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
};

export default SettleTr;
