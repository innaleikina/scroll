import React, { Component } from 'react';
import API from "../../utils/API";
import {Button} from "../../components/form";


class Profile extends Component {
   
  state = {
    userId: this.props.match.params.id,
     otherUser:{},
     followed: false
    
  }

  componentDidMount(){
    this.loadProfile();
  }

  loadProfile = () => {
    API.getProfile(this.state.userId)
        .then(res =>
            this.setState({
                otherUser: res.data,

            }, console.log(res.data))
        )
        .catch(err => console.log(err));
};

handleFollow = () => {
  API.followUser(this.props.user._id, this.state.otherUser._id)
  .then(res => console.log(res.data))
}


  render() {
    return (
      <div>
     <h1> Profile Page </h1>
     <h3> logged in user  {this.props.user._id}</h3>
     <h2> other user {this.state.otherUser.name} </h2>
     <h2> {this.state.otherUser.email} </h2>
     <Button onClick={this.handleFollow}> follow </Button>
    </div>
    )
  }
};

export default Profile;