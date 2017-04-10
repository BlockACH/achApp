import React from 'react';

function SettleTr(props) {
  return (
    <tr>
      <td className="red">{props.bankCode}</td>
      <td className="red">{props.address}</td>
      <td className="red">{props.amount}</td>
    </tr>
  );
}

SettleTr.propTypes = {
  bankCode: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
};

export default SettleTr;
