import React from 'react';
import CheckTxList from './checkTxList';
import globalStore from './global';

function TchPage() {
  return globalStore.bank === 'TCH' && globalStore.model === 'settle' ? (
    <div className="row">
      <div className="col-md-12 col-sm-12 col-xs-12">
        <CheckTxList
          title="TCH 審核"
          subtitle="待 TCH 審核交易"
          acceptUrl={`${globalStore.getBaseUrl()}/transactions/approve`}
          rejectUrl={`${globalStore.getBaseUrl()}/transactions/destroy`}
          fetchTxsUrl={`${globalStore.getBaseUrl()}/transactions/query?s=accepted`}
        />
      </div>
    </div>
  ) : <div className="row">
    <div className="col-md-12 col-sm-12 col-xs-12">
      <h2>Forbidden!</h2>
    </div>
  </div>;
}

export default TchPage;
