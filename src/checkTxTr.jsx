import React from 'react';

function Tr(props) {
  return (
    <tr>
      <td>{props.pbank}</td>
      <td>{props.rbank}</td>
      <td>{props.type}</td>
      <td>{props.amount}</td>
      <td>
        <a className="btn btn-primary btn-xs"><i className="fa fa-folder" /> 細節 </a>
        <a className="btn btn-info btn-xs"><i className="fa fa-pencil" /> 同意 </a>
        <a className="btn btn-danger btn-xs"><i className="fa fa-trash-o" /> 拒絕 </a>
      </td>
    </tr>
  );
}

Tr.propTypes = {
  pbank: React.PropTypes.string.isRequired,
  rbank: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
};

export default Tr;
