import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";
import API from "../../utils/API";

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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      console.log("inputs working");
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      API.createUser(newUser)
        .then(res => console.log("created user"))
        .catch(err => console.log(err));
    }
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.username && this.state.passwordLogin) {
      console.log("loggin in");
    }
  }

  render() {
    return (
      <div>
      <h3>Sign Up Below:</h3>
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
      onClick={this.handleFormSubmit}
      >
      </SubmitSignUp>
    </form>
    <hr/>
    <h3>Or Login:</h3>
    <form>
      <SignUp
        label="Username/Email"
        id="username"
        placeholder="john@smith.com"
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
        value={this.state.passwordLogin}
        onChange={this.handleInputChange}
      >
      </SignUp>
      <SubmitSignUp
      onClick={this.handleLogin}
      >
      </SubmitSignUp>
    </form>
    </div>
    )
  }
};

export default Login;