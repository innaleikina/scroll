import React from "react";

export const SignUp = (props) => (
  <div className="form-group">
    <label>{props.label}</label>
    <input type="text" className="form-control" id={props.id} placeholder={props.placeholder} {...props}/>
  </div>
);