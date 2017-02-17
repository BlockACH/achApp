import React from 'react';

function TriggerForm() {
  return (
    <div className="x_panel">
      <div className="x_title">
        <h2> 發動 <small>ACH</small></h2>
        <div className="clearfix" />
      </div>
      <div className="x_content">
        <form className="form-horizontal form-label-left" noValidate>
          {
          // <p>For alternative validation library
          //   <code>parsleyJS</code>
          //     check out in the
          //     <a href="form.html">form page</a>
          // </p>
          }
          <span className="section">發動交易資料</span>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="name"
            >
            發動行
            <span className="required">*</span>
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                id="name"
                className="form-control col-md-7 col-xs-12"
                data-validate-length-range={6}
                data-validate-words={2}
                name="name"
                placeholder="both name(s) e.g Jon Doe"
                required="required" type="text"
              />
            </div>
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="email"
            >
            收受行
            <span className="required">*</span>
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                type="email"
                id="email"
                name="email"
                required="required"
                className="form-control col-md-7 col-xs-12"
              />
            </div>
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="email"
            >
            交易類別（代收、代付、代收退件、代付退件）
            <span className="required">*</span>
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                type="email"
                id="email2"
                name="confirm_email"
                data-validate-linked="email"
                required="required"
                className="form-control col-md-7 col-xs-12"
              />
            </div>
          </div>
          <div className="item form-group">
            <label
              className="control-label col-md-3 col-sm-3 col-xs-12"
              htmlFor="number"
            >
            交易金額
            <span className="required">*</span>
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input
                type="number"
                id="number"
                name="number"
                required="required"
                data-validate-minmax="10,100"
                className="form-control col-md-7 col-xs-12"
              />
            </div>
          </div>

          <div className="ln_solid" />
          <div className="form-group">
            <div className="col-md-6 col-md-offset-3">
              <button type="submit" className="btn btn-primary">Cancel</button>
              <button id="send" type="submit" className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TriggerForm;
