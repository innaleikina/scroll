import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";
import API from "../../utils/API";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: ""
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
        username: this.state.email,
        password: this.state.password
      }
      API.createUser(newUser)
        .then(res => console.log("created user"))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
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
    )
  }
};

export default Login;