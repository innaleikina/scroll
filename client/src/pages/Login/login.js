import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";

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
        onClick={(event) => this.props.handleFormSubmit(event, this.state.name, this.state.email, this.state.password)}
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
        onClick={(event) => this.props.handleLogin(event, this.state.username, this.state.passwordLogin)}
        >
        </SubmitSignUp>
      </form>
    </div>
    )
  }
};

export default Login;