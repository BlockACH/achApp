/* global $:true*/
import React from 'react';
import SettleTr from './settleTr';

class SettleTable extends React.Component {
  componentDidMount() {
    $('#datatable').dataTable();
  }

  render() {
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2> 清算實況 <small>settlement</small></h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <p className="text-muted font-13 m-b-30">
            票交業務銀行情況
          </p>
          <table id="datatable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>銀行</th>
                <th>銀行代碼</th>
                <th>Address</th>
                <th>虛擬貨幣餘額</th>
              </tr>
            </thead>
            <tbody>
              <SettleTr
                bank="玉山商業銀行"
                bankCode="6AB"
                address="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
                amount={100000}
              />
              <SettleTr
                bank="兆豐國際商業銀行"
                bankCode="A2B"
                address="1CvBMSEYsasdfwqTFn5Au4m4GFg7xJaNVN2"
                amount={970000}
              />
              <SettleTr
                bank="匯豐（台灣）商業銀行"
                bankCode="46E"
                address="1Fn5Au4mCvBMSEYsasdfwqT4GFg7xJaNVN2"
                amount={951000}
              />
              <SettleTr
                bank="第一商業銀行"
                bankCode="822"
                address="1FsasdfwqT4n5Au4mCvBMSEYGFg7xJaNVN2"
                amount={81200}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SettleTable;
