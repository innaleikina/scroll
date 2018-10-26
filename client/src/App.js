import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import AllPosts from "./pages/AllPosts";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";
import Profile from './pages/Profile';

import API from "./utils/API";
import "./app.css";


class App extends Component {
  state = {
    user: {}
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
    // API.postLoggedInUser(user)
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
    this.setState({
      user: user
    }, this.redirect);
  };

  redirect = () => {
    console.log(this.state.user)
    window.location.href = "/home"
  }

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data
        }, console.log(this.state.user))
      });
  }

  componentDidMount() {
    this.fetchUser();
  }

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
           <NavItem link="/home">home </NavItem>
           <NavItem link="/search">search </NavItem>
           <NavItem link="/user profile">user profile</NavItem>
           <NavItem link="/new post">new post</NavItem>
         </NavBar>
         {/* <p>{this.state.user.name}</p> */}
        <Switch>
            <Route exact path="/"  render={(props) => <Login {...props} handleFormSubmit={this.handleFormSubmit} handleLogin={this.handleLogin} handleFBLogin={this.handleFBLogin}/>} />
            <Route exact path="/post/:id"  render={(props) => <OnePost {...props} user={this.state.user}/>}/>
            <Route exact path="/home" render={(props) => <Timeline {...props} user={this.state.user}/>}/>
            <Route exact path="/search" render={(props) => <AllPosts {...props} user={this.state.user}/>} />
            <Route exact path="/user/otherUser/:id" render={(props) => <Profile {...props} user={this.state.user}/>} 
             />
            <Route exact path="/new post" render={(props) => <AddPost {...props} user={this.state.user}/>} />
            {/* <Route component={NoMatch} /> */}
        </Switch>

      </div>
    </Router>
    )
  };
}


export default App;
