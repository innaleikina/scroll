import React, { Component } from 'react';
import API from "../../utils/API";
import {Button} from "../../components/form";


class Profile extends Component {
   
  state = {
    userId: this.props.match.params.id,
     user:{}
    
  }

  componentDidMount(){
    this.loadProfile();
  }

  loadProfile = () => {
    API.getProfile(this.state.userId)
        .then(res =>
            this.setState({
                user: res.data,
            }, console.log(res.data))
        )
        .catch(err => console.log(err));
};


  render() {
    return (
      <div>
     <h1> Profile Page </h1>
     <h2> {this.state.user.name} </h2>
     <h2> {this.state.user.email} </h2>
     <Button> follow </Button>
    </div>
    )
  }
};

export default Profile;