import React from "react";

export const Select =({ children } , props) => (

    <select className="select" {...props}>
      {children}
    </select>

);
