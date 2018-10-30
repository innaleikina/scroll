import React from "react";

export const SubmitSignUp = (props) => (
  <button {...props} type="submit" className="btn btn-primary sign-up-submit login-btns d-flex justify-content-center" id={props.id}>{props.text}</button>
)
