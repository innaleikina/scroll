import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ellipsize from 'ellipsize';

import {Posts, PostItem} from "../../components/post";
import API from "../../utils/API";
import "./timeline.css";

class Timeline extends Component {

    state = {
        following: []
     }

    componentWillMount() {
       this.loadPosts()
    }

    mapFollowing = (res) => {
      res.data.following.map(following => 
        API.getProfile(following)
          .then(res => this.setState({
            following: [...this.state.following, res.data]
          }))
          // .then(this.setState({following: allFollowing}, console.log(typeof(this.state.following))))
          .catch(err => console.log(err))
      )
      
    }

    loadPosts = () => {
      API.fetchUser() 
        .then(res => this.mapFollowing(res))
        .catch(err => console.log(err))
    };


  render() {
    console.log(this.state.following)
    return (
        <div id="timeline-wrap" >
        {/* <p>FOLLOWING THESE GUYS {this.props.user.following}</p> */}
          {this.state.following.length === 0? <div> You don't follow anyone yet </div> :
          this.state.following.map(result => 
            <div className="following-wrap">
              <p className="owner-name"> <Link className="link-author" to={`/user/otherUser/${result._id}`}>{result.name} </Link>'s posts</p>
              {result.posts.map(post => 
              <div>
                 <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
          <div className = "post-text">
                <Link to={`/post/${post._id}`}>
               
                <div className="name-genre-wrap">
                
                  <div className="small-text">{post.genre}</div>
                </div>

                <div className="title-type-wrap">
                    <h6 className="post-title">{post.title}</h6>
             
                     <p className="small-text">{post.type}</p>
                   </div> 
                   
                   
                    <p className="content-text"  data-post={post._id}> {ellipsize(post.content, 300)} </p>
                </Link>
           </div>
           <div className="post-data">
              <p> <i className="far fa-heart"></i>{post.likes.length} </p>
              <p><i className="far fa-comment"></i>{post.comment.length} </p>
           </div>
           {/* <Button onClick={() => this.deleteArticle(article._id)}> delete </Button> */}
        </PostItem>
 
              </div>
              )}
            </div>
          

          
            )}
    </div>
    );
  }
}
export default Timeline;