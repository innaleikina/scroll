import React from "react";

export const Select =( props) => (

    <select className="select" {...props}>
      {props.children}
    </select>

);
