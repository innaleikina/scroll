import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";



const App = () => (
  <Router>
    <div>
    <NavBar>
         <h1> Scroll </h1>
         <NavItem>home </NavItem>
         <NavItem>search </NavItem>
         <NavItem>user profile</NavItem>
         <NavItem>new post</NavItem>
       </NavBar>
      <Switch>
      <Route exact path="/" component={Main} />
        <Route exact path="/post/:id" component={OnePost} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Timeline} />
        <Route exact path="/search" component={Main} />
        <Route exact path="/user" component={Main} />
        <Route exact path="/new post" component={AddPost} />
  
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>

);

export default App;
