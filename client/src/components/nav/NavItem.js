import React from "react";
import { Link } from 'react-router-dom';
import "./nav.css";

export const NavItem = props => (
  <li className="nav-item">
     <Link to={props.link}>{props.children}</Link>
  </li>
);
