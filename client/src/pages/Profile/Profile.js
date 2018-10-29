import React, { Component } from 'react';
import API from "../../utils/API";
import {Button} from "../../components/form";
import {Posts, PostItem} from "../../components/post"
import ellipsize from 'ellipsize';

import "./profile.css";


class Profile extends Component {
   
  state = {
    userId: this.props.match.params.id,
     otherUser:{},
     posts:[],
     followed: false,
     loggedInUser:{}
    
  }

  componentDidMount(){
    this.loadProfile();
  }

  loadProfile = () => {
     API.fetchUser()
     .then(res => this.setState({
        loggedInUser: res.data
     }))
     .catch(err => console.log(err));
      
     API.getProfile(this.state.userId)
        .then(res =>
            this.setState({
                otherUser: res.data,
                posts: res.data.posts,
            })
        )
        .catch(err => console.log(err));
     };

    


     handleFollow = () => { 
              if(this.state.loggedInUser.following.length > 0){
                console.log("length is greater than 0")
          
                if(this.state.loggedInUser.following.includes(this.state.otherUser._id)){
                  console.log("you already follow this user");
                  this.setState({
                    followed:true
                  })
                 } else {
                  API.followUser(this.props.user._id, this.state.otherUser._id)
                  .then(this.setState({
                   followed : true
                    }))
                   .then(res => console.log(res.data))
                 }
               } else {
                  API.followUser(this.props.user._id, this.state.otherUser._id)
                  .then(this.setState({
                   followed : true
                 }))
                 .then(res => console.log(res.data))
               }
            }


            isEmpty = (obj) => {
              for(var key in obj) {
                  if(obj.hasOwnProperty(key))
                      return false;
              }
              return true;
          }




    renderFollowButton = () => {
      // console.log(this.state.loggedInUser)
      if(!this.isEmpty(this.state.loggedInUser)){
        console.log("logged in user is not empty");
        if(this.state.loggedInUser.following.length > 0){
          if(this.state.loggedInUser.following.includes(this.state.otherUser._id)){
             return (
               <div> following </div>
              );
            } else {
               return (
              !this.state.followed ?  <div className="following-wrap"><Button className="follow-btn" onClick={this.handleFollow}> follow </Button></div> :  
              <div className="following-wrap"> following </div> 
            
            );
          }
       }  else {
          return (
            !this.state.followed ?  <div className="following-wrap"><Button className="follow-btn" onClick={this.handleFollow}> follow </Button></div> :  
            <div className="following-wrap"> following </div> 
          )
       }
      }
      
    }
            

  render() {
    // console.log( this.state.loggedInUser)
    return (
      <div className="profile-wrap">
      
      <div className="name-follow-wrap">
         <h2 className="profile-name"> {this.state.otherUser.name} </h2>
         {this.renderFollowButton()}
        
       </div>
     {/* <p> {this.state.posts[0]}</p> */}
     <Posts>
        {this.state.posts.map(post=> (
            
             <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
          <div className = "post-text">
                <a href={`/post/${post._id}`}>
               
                <div className="name-genre-wrap">
                  <p className="small-text">{post.type}</p>
                  <div className="small-text">{post.genre}</div>
                </div>

                <div className="title-type-wrap">
                    <h6 className="post-title-profile">{post.title}</h6>
             
                    
                   </div> 
                   
                   
                    <p className="content-text"  data-post={post._id}> {ellipsize(post.content, 300)} </p>
                </a>
           </div>
           <div className="post-data">
              <p> <i className="far fa-heart"></i>{post.likes} </p>
              <p><i className="far fa-comment"></i>{post.comment.length} </p>
           </div>
           {/* <Button onClick={() => this.deleteArticle(article._id)}> delete </Button> */}
        </PostItem>
            
        ))}
         </Posts> 
    </div>
    )
  }
};

export default Profile;