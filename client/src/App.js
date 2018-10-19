import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";


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

        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Timeline} />
        <Route exact path="/search" component={Main} />
        <Route exact path="/user" component={Main} />
  
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>

);

export default App;
