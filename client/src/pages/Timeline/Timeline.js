import React, { Component } from 'react';
import ellipsize from 'ellipsize';

import {Posts, PostItem} from "../../components/post";
import API from "../../utils/API";
import "./timeline.css";

class Timeline extends Component {

    state = {
        posts: [],
        user:{}
     }

    // componentWillMount() {
    //    this.loadPosts()
    // }

    setStateUser = () => {
        this.setState={
            user:this.props.user
        }
    }

    loadPosts = () => {
        {this.props.user.following.map(following => (
            API.getPostsFollowing(following)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        ))}
    };


  render() {
    // this.setState();
    console.log(this.props.user)
  
    return (
        <div id="timeline-wrap" >
        <p>FOLLOWING THESE GUYS {this.props.user.following}</p>
        {/* <h3 > Timeline </h3> */}
        <Posts>
        {this.state.posts.map(post => (
        <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
          <div className = "post-text">
                <a href={`/post/${post._id}`}>
                    <a href={`/user/otherUser/${post.author._id}` }> <p  className="post-author-name" data-author-id={post.author._id} data-author={post.author.name}>{post.author.name}  </p></a>
                    <p  data-post={post._id}> {ellipsize(post.content, 300)} </p>
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
    );
  }
}
export default Timeline;