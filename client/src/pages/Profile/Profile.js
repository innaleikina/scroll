import React, { Component } from 'react';
import API from "../../utils/API";
import {Button} from "../../components/form";
import {Posts, PostItem} from "../../components/post"
import "./profile.css";


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
      <div className="profile-wrap">
     {/* <h1> Profile Page </h1> */}
     {/* <h3> logged in user  {this.props.user._id}</h3> */}
     <h2> {this.state.otherUser.name} </h2>
     {/* <div> followers  {this.state.otherUser.followers} </div> */}
     {/* <div> posts  {this.state.otherUser.posts} </div> */}
     <Button onClick={this.handleFollow}> follow </Button>
        {/* {this.state.otherUser.posts.map(post=> (
            <Posts key={post._id}>
               <PostItem> 
               {post.title} 
               
                </PostItem>
             </Posts> 
        ))} */}
    </div>
    )
  }
};

export default Profile;