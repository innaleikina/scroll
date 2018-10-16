import React, { Component } from 'react';
import {NavBar, NavItem} from "../../nav";
import Timeline from "../Timeline";


class Main extends Component {
  render() {
    return (
        <div>
       <NavBar>
         <h1> Scroll </h1>
         <NavItem>home </NavItem>
         <NavItem>search </NavItem>
         <NavItem>published</NavItem>
         <NavItem>user</NavItem>
       </NavBar>
       <Timeline/>
       </div>
    );
  }
}

export default Main;