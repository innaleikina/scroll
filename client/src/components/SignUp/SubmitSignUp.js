import React from "react";

export const SubmitSignUp = (props) => (
  <button {...props} type="submit" className="btn btn-primary sign-up-submit">{props.text}</button>
)
