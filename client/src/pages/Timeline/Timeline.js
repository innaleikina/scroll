import React, { Component } from 'react';
import ellipsize from 'ellipsize';

import {Posts, PostItem} from "../../components/post";
import API from "../../utils/API";
import "./timeline.css";

class Timeline extends Component {

    state = {
        posts: [],
        postPreview:""
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        API.getPosts()
            .then(res =>
                this.setState({
                    posts: res.data,
                }, console.log(res.data))
            )
            .catch(err => console.log(err));
    };

   


  render() {
    return (
        <div id="timeline-wrap" >
        {/* <h3 > Timeline </h3> */}
        <Posts>
        {this.state.posts.map(post => (
        <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
          <div className = "post-text">
                <a href={`/post/${post._id}`}>
                    <p  className="post-author-name" data-author={post.author.name}>{post.author.name}  </p>
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