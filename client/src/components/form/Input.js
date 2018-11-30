import React from "react";

export const Input = props => (
  <div className="input-container">
  
    <input className="input" {...props} placeholder={props.placeholder}  />
  </div>
);
