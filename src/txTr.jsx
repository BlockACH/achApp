import React from 'react';
import globalStore from './global';

function TxTr(props) {
  const statusTable = {
    ready: '等待收受行確認',
    accepted: globalStore.model === 'settle' ? '等待 TCH 審核' : '已完成',
    rejected: '收受行已拒絕',
    approved: 'TCH 已審核通過',
    destroyed: 'TCH 審核失敗',
  };

  return (
    <tr>
      <td>{props.triggerBank}</td>
      <td>{props.receiveBank}</td>
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
  date: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  status: React.PropTypes.string.isRequired,
};

export default TxTr;
