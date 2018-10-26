import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Timeline from "./pages/Timeline";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Search from "./pages/Search";
import API from "./utils/API";
import "./app.css";


class App extends Component {
  state = {
   user: {

   }
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
       user: user
    }, this.consoling);
  };

  consoling = () => {
    console.log(this.state.user)
    window.location.href = "/home"
  }

  handleFBLogin = (event) => {
    event.preventDefault();
    console.log("loggin in with fb");
    API.getFBUser()
    .then(res => console.log("response from api call"))
    .catch(err => console.log(err));
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
        <Route exact path="/"  render={(props) => <Login {...props} handleFormSubmit={this.handleFormSubmit} handleLogin={this.handleLogin} handleFBLogin={this.handleFBLogin}/>} />
          <Route exact path="/post/:id"  render={(props) => <OnePost {...props} />}/>
           <Route exact path="/home" render={(props) => <Timeline {...props} />}/>
          <Route exact path="/search" render={(props) => <Search {...props}/>} />
          <Route exact path="/user" render={(props) => <Main {...props}/>} />
          <Route exact path="/new post" render={(props) => <AddPost {...props} userName={this.state.user.name}/>} />
    
          {/* <Route component={NoMatch} /> */}
        </Switch>

      </div>
    </Router>
    )
  }

};


export default App;
