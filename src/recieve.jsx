import React from 'react';
import CheckTxList from './checkTxList';

function RecievePage() {
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <CheckTxList
          title="收受"
          subtitle="待確認收受交易"
        />
      </div>
    </div>
  );
}

export default RecievePage;
