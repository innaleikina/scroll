import React, { Component } from 'react';
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
        <h3 > Timeline {this.props.user.name}</h3>
        {/* <Posts> */}
          {this.state.following.map(result => 
            <div>
              <p>{result.name}</p>
              {result.posts.map(post => 
              <p>{post.content}</p>
            )}
            </div>
          

            
            // <p>{result.name}</p>

            // <PostItem key={result._id}>
            //   <p>{result.name}</p>
            // </PostItem>
            )}
        {/* </Posts> */}
    </div>
    );
  }
}
export default Timeline;