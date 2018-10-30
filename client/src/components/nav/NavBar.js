import React from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

export const NavBar = ({ children }) => {
  return (
    <nav >
      <h1 ><Link id="logo" to="/home"> SCROLL </Link></h1>
      <ul className="nav-bar">
        {children}
      </ul>
    </nav>
  );
};