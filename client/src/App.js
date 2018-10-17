

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/pages/Main";
import Timeline from "./components/pages/Timeline";

import {NavBar, NavItem} from "./components/nav";


const App = () => (
  <Router>
    <div>
    <NavBar>
         <h1> Scroll </h1>
         <NavItem>home </NavItem>
         <NavItem>search </NavItem>
         <NavItem>user profile</NavItem>
         <NavItem>add new post</NavItem>
       </NavBar>
      <Switch>
      <Route exact path="/" component={Main} />

        <Route exact path="/home" component={Timeline} />
        <Route exact path="/search" component={Main} />
        <Route exact path="/user" component={Main} />
  
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
