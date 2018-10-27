import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import AllPosts from "./pages/AllPosts";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Test from "./pages/Test";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import LogOut from './components/LogOut';

import API from "./utils/API";
import "./app.css";


class App extends Component {
  state = {
    user: {},
    authed: false
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
    console.log("saving user", user)
    this.setState({
      user: user,
      authed: true
    }, this.redirect);
  };

  redirect = () => {
    console.log("REDIRECT", this.state.user, this.state.authed);
    this.logoutButton();
    // window.location.href = "/home"
  };

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({
            user: res.data,
            authed: true
          }, this.logoutButton)
        }
      });
  };

  componentDidMount() {
    this.fetchUser();
  };

  alert = () => {
    console.log("hello");
    if (this.state.authed === false) {
      {alert("Please log in first.")} 
    }
  };

  logoutButton = () => {
    console.log("logout button function called")
    let logoutbtn = document.getElementById("logoutBtn");
    if (this.state.authed === true) {
      logoutbtn.style.display = "block";
    } else {
      logoutbtn.style.display = "none";
    }
  };

  handleLogout = () => {
    console.log("logging out");
    API.logout() 
      .then(res => this.setState({
        user: {},
        authed: false
      }, this.logoutButton))
      .catch(err => console.log(err));
  };

  // handleFBLogin = (event) => {
  //   event.preventDefault();
  //   console.log("loggin in with fb");
  //   API.getFBUser()
  //   .then(res => console.log("response from api call"))
  //   .catch(err => console.log(err));
  // }

  render() {
    return (
      <Router>
      <div>
          <NavBar>
           <NavItem onClick={this.alert} link="/home">home </NavItem>
           <NavItem onClick={this.alert} link="/search">search </NavItem>
           <NavItem onClick={this.alert} link="/user profile">user profile</NavItem>
           <NavItem onClick={this.alert} link="/new post">new post</NavItem>
         </NavBar>
         {/* <p>{this.state.user.name}</p> */}
         <LogOut handleLogout={this.handleLogout}></LogOut>
        <Switch>
            <Route exact path="/"  render={(props) => <Test {...props} handleFormSubmit={this.handleFormSubmit} handleLogin={this.handleLogin} handleFBLogin={this.handleFBLogin}/>} />

            {/* <Route exact path="/post/:id"  render={(props) => <OnePost {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="/home" render={(props) => <Timeline {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="/search" render={(props) => <Search {...props} user={this.state.user}/>} /> */}
            <Route exact path="/user/otherUser/:id" render={(props) => <Profile {...props} user={this.state.user}/>} />
            {/* <Route exact path="/new post" render={(props) => <AddPost {...props} user={this.state.user}/>} /> */}

            <PrivateRoute authed={this.state.authed} user={this.state.user} path='/home' component={Timeline} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/post/:id"  component={OnePost} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/search"   component={Search} />
            {/* <PrivateRoute authed={this.state.authed} user={this.state.user} path="/user/otherUser/:id"  component={Profile} /> */}
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/new post" component={AddPost} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/user profile" component={Profile} />

            {/* <Route component={NoMatch} /> */}
        </Switch>

      </div>
    </Router>
    )
  };
}


export default App;
