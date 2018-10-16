import React from "react";
import "./nav.css";

export const NavBar = ({ children }) => {
  return (
    <nav >
      <ul>
        {children}
      </ul>
    </nav>
  );
};