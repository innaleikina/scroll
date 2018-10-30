import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";
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

  render() {
    return (
    <div className="login-page">
      <div className="intro">
        <h5>Welcome to Scroll!</h5>
        <p>A social platform for lovers of reading and writing.</p>
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
            onClick={(event) => this.props.handleLogin(event, this.state.username, this.state.passwordLogin)}
            >
            </SubmitSignUp>

            {/* <SubmitSignUp
            text="login with google"
            id="googleLogin"
            onClick={(event) => this.props.handleGoogleLogin(event)}
            >
            </SubmitSignUp> */}
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
            onClick={(event) => this.props.handleFormSubmit(event, this.state.name, this.state.email, this.state.password)}
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