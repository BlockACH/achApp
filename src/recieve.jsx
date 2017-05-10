import React from 'react';
import CheckTxList from './checkTxList';
import globalStore from './global';

function RecievePage() {
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <CheckTxList
          title="收受"
          subtitle="待確認收受交易"
          acceptUrl={`${globalStore.getBaseUrl()}/transactions/accept`}
          rejectUrl={`${globalStore.getBaseUrl()}/transactions/reject`}
          fetchTxsUrl={`${globalStore.getBaseUrl()}/transactions/` +
                        `query?r=${globalStore.bank}&s=ready`}
        />
      </div>
    </div>
  );
}

export default RecievePage;
