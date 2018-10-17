import React from "react";
import "./nav.css";

export const NavItem = props => (
  <li>
     <a href={`/${props.children}`}>{props.children}</a>
  </li>
);
