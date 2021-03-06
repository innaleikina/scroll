import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Timeline from "./pages/Timeline";
import OnePost from "./pages/OnePost";
import {NavBar, NavItem} from "./components/nav";
import Login from "./pages/Login";
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

  fetchUser = () => {
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.setState({
            user: res.data,
            authed: true
          }, this.logoutButton)
        }
      })
  };

  componentDidMount() {
    this.fetchUser();
  };

  alert = () => {
    if (this.state.authed === false) {
      alert("Please log in first.")
    }
  };

  logoutButton = (history) => {
    let logoutbtn = document.getElementById("logoutBtn");
    if (this.state.authed === true) {
      logoutbtn.style.display = "block";
    } else {
      logoutbtn.style.display = "none";
    }
  };

  handleLogout = () => {
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
  // };

  // handleGoogleLogin = (event) => {
  //   event.preventDefault();
  //   console.log("loggin in with google")
  //   API.getGoogleUser()
  //     .then(res => console.log("hit google api, came back"))
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <Router>
      <div className="main-page">
      <LogOut handleLogout={this.handleLogout}></LogOut>
          <NavBar>
           <NavItem onClick={this.alert} link="/home">home </NavItem>
           <NavItem onClick={this.alert} link="/search">search </NavItem>
           <NavItem onClick={this.alert} link={`/user/otherUser/${this.state.user._id}`}>user profile</NavItem>
           <NavItem onClick={this.alert} link="/new post">new post</NavItem>
         </NavBar>
         {/* <p>{this.state.user.name}</p> */}
         
        <Switch>
            <Route exact path="/"  render={(props) => <Login {...props} fetchUser={this.fetchUser}/>}/>

            {/* <Route exact path="/post/:id"  render={(props) => <OnePost {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="/home" render={(props) => <Timeline {...props} user={this.state.user}/>}/> */}
            {/* <Route exact path="/search" render={(props) => <Search {...props} user={this.state.user}/>} /> */}
            {/* <Route exact path="/user/otherUser/:id" render={(props) => <Profile {...props} user={this.state.user}/>} /> */}
            {/* <Route exact path="/new post" render={(props) => <AddPost {...props} user={this.state.user}/>} /> */}

            <PrivateRoute authed={this.state.authed} user={this.state.user} path='/home' component={Timeline} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/post/:id"  component={OnePost} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/search"   component={Search} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/user/otherUser/:id"  component={Profile} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/new post" component={AddPost} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path={`/user/otherUser/${this.state.user._id}`} component={Profile} />

            {/* <Route component={NoMatch} /> */}
        </Switch>

      </div>
    </Router>
    )
  };
}


export default App;
