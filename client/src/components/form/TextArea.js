import React from "react";

export const TextArea = props => (
  <div className="input-container">
    <textarea className="textarea" {...props} placeholder={props.placeholder} />
  </div>
);
