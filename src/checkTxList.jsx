import React from 'react';
import Tr from './checkTxTr';


class CheckTxList extends React.Component {
  static get defaultProps() {
    return {
      title: 'Title!',
      subtitle: 'This is subtitle...',
    };
  }

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
    };
  }

  render() {
    return (
      <div className="x_panel">
        <div className="x_title">
          <h2>{this.props.title}</h2>
          <div className="clearfix" />
        </div>
        <div className="x_content">
          <p>{this.props.subtitle}</p>
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th>發動行</th>
                <th>收受行</th>
                <th>交易類別</th>
                <th>金額</th>
                <th style={{ width: '30%' }}>###</th>
              </tr>
            </thead>
            <tbody>
              <Tr
                pbank="玉山銀行"
                rbank="兆豐銀行"
                type="代收"
                amount={100}
              />
              <Tr
                pbank="第一銀行"
                rbank="兆豐銀行"
                type="代付"
                amount={3000}
              />
              <Tr
                pbank="玉山銀行"
                rbank="兆豐銀行"
                type="代付"
                amount={500}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CheckTxList;
