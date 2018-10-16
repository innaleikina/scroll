import React, { Component } from 'react';
import {NavBar, NavItem} from "../../nav";


class Main extends Component {
  render() {
    return (
       <NavBar>
         <h1> Scroll </h1>
         <NavItem>home </NavItem>
         <NavItem>search </NavItem>
         <NavItem>published</NavItem>
         <NavItem>user</NavItem>
       </NavBar>
    );
  }
}

export default Main;