import React, { Component } from 'react';
import {SignUp, SubmitSignUp} from "../../components/SignUp";

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
    //   API.createUser(this.state.topic, this.state.startYr, this.state.endYr)
    //     .then(res => this.setState({ articles: res.data.response.docs, topic: "", startYr: "", endYr: "" }, this.loadArticles))
    //     .catch(err => console.log(err));
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