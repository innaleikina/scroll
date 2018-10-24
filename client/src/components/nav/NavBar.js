import React from "react";
import "./nav.css";

export const NavBar = ({ children }) => {
  return (
    <nav >
      <h1 ><a id="logo" href="/home"> SCROLL </a></h1>
      <ul className="nav-bar">
        {children}
      </ul>
    </nav>
  );
};