import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";
import API from "../../utils/API";

import "./Login.css";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    username: "",
    passwordLogin: ""
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      API.createUser(newUser)
        .then(res => {alert("New user created.")})
        .catch(err => {alert("Please put in a valid email.")});
    } else {
      alert("Please fill in your name, email, and password.")
    }
  };

  //handling user login
  handleLogin = (event) => {
    event.preventDefault();
    console.log("handeling login")
    //if username and password inputs have been filled...
    if (this.state.username && this.state.passwordLogin) {
      const loginUser = {
        username: this.state.username,
        password: this.state.passwordLogin
      }
      //hit the API file, getUser method and pass the login user information
      API.getUser(loginUser)
        .then(res => {
          if(typeof(res.data) === "string") {
            alert("Incorrect email or password.") 
          } else {
            this.redirect()
          }})
        .catch(err => console.log(err));
    } else {
      alert("Please input both your email and password.")
    }
  };

  redirect = () => {
    this.props.fetchUser();
    API.fetchUser()
      .then(res => {
        if (res.data) {
          this.props.history.push("/home");
        }
      })
  };


  render() {
    return (
    <div className="login-page">
      <div className="intro">
        <h5 id="welcome-msg">Welcome to Scroll!</h5>
        <p id="tagline">A social platform for lovers of reading and writing. </p>
      </div>

      <div id="about-scroll">
      <p> Writer? Publish your writing on scroll, recieve feedback, and gain a following of dedicated readers who look forward to your new work. Reader? Join scroll and never be without reading material again.  </p>
      </div>

      <nav>
        <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-login-tab" data-toggle="tab" href="#nav-login" role="tab" aria-controls="nav-login" aria-selected="true">LOGIN</a>
          <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">SIGN UP</a>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
          <form>
            <SignUp
              label="Email"
              id="username"
              placeholder="john@smith.com"
              type="email"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            >
            </SignUp>
            <SignUp
              label="Password"
              id="passwordLogin"
              placeholder="password"
              name="passwordLogin"
              type="password"
              value={this.state.passwordLogin}
              onChange={this.handleInputChange}
            >
            </SignUp>
            <SubmitSignUp
            text="login"
            id="regLogin"
            onClick={(event) => this.handleLogin(event)}
            >
            </SubmitSignUp>
         </form>
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form>
            <SignUp
              label="Name"
              id="name"
              placeholder="John Smith"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            >
            </SignUp>
            <SignUp
              label="Email"
              id="email"
              placeholder="John@Smith.com"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            >
            </SignUp>
            <SignUp
              label="Password"
              id="password"
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            >
            </SignUp>
            <SubmitSignUp
            text="submit"
            onClick={(event) => this.handleFormSubmit(event)}
            id="regSignUp"
            >
            </SubmitSignUp>
          </form>
        </div>
      </div>
    </div>
    )
  }
};

export default Login;