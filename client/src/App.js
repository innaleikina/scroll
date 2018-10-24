import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import API from "./utils/API";
import "./app.css";


class App extends Component {
  state = {
    name: "",
    email: "",
    id: "",
    followers: [],
    following: []
  }

  handleFormSubmit = (event, name, email, password) => {
    event.preventDefault();
    if (name && email && password) {
      console.log("inputs working");
      const newUser = {
        name: name,
        email: email,
        password: password
      }
      API.createUser(newUser)
        .then(res => console.log("created user"))
        .catch(err => console.log(err));
    }
  };

  //handling user login
  handleLogin = (event, username, password) => {
    event.preventDefault();
    //if username and password inputs have been filled...
    if (username && password) {
      console.log("logging in");
      const loginUser = {
        username: username,
        password: password
      }
      //hit the API file, getUser method and pass the login user information
      API.getUser(loginUser)
        .then(res => this.savingUserInfo(res))
        .catch(err => console.log(err));
    }
  };

  savingUserInfo = (res) => {
    console.log(res);
    const user = res.data;
    this.setState({
      name: user.name,
      email: user.email,
      id: user._id,
      followers: user.followers,
      following: user.following
    }, this.consoling);
  };

  consoling = () => {
    console.log(this.state.email, this.state.name)
  }

  render() {
    return (
      <Router>
      <div>
      <NavBar>
           <NavItem>home </NavItem>
           <NavItem>search </NavItem>
           <NavItem>user profile</NavItem>
           <NavItem>new post</NavItem>
         </NavBar>
        <Switch>
        <Route exact path="/"  render={(props) => <Login {...props} handleFormSubmit={this.handleFormSubmit} handleLogin={this.handleLogin}/>} />
          <Route exact path="/post/:id"  render={(props) => <OnePost {...props} />}/>
           <Route exact path="/home" render={(props) => <Timeline {...props} />}/>
          <Route exact path="/search" render={(props) => <Main {...props}/>} />
          <Route exact path="/user" render={(props) => <Main {...props}/>} />
          <Route exact path="/new post" render={(props) => <AddPost {...props} userName={this.state.name}/>} />
    
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
    )
  }

};


export default App;
