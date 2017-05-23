import React from 'react';

function SettleTr(props) {
  return (
    <tr>
      <td>{props.bankCode}</td>
      <td>{props.address}</td>
      {
        props.unsettledBalance === undefined ?
          <td className={props.balance < 1000 ? 'red' : ''}>{props.balance}</td>
          :
          <td className={props.balance + props.unsettledBalance < 1000 ? 'red' : ''}>
            {props.balance} / {
              props.unsettledBalance > 0 ?
              `+${props.unsettledBalance}` : props.unsettledBalance
            }
          </td>
      }
    </tr>
  );
}

SettleTr.propTypes = {
  bankCode: React.PropTypes.string.isRequired,
  address: React.PropTypes.string.isRequired,
  balance: React.PropTypes.number.isRequired,
  unsettledBalance: React.PropTypes.number,
};

export default SettleTr;
