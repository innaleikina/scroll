import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ellipsize from 'ellipsize';

import {Posts, PostItem} from "../../components/post";
import API from "../../utils/API";
import "./allposts.css";

class AllPosts extends Component {

    state = {
        posts: [],
        postPreview:"",
        user: {}
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
        <p> Explore</p>
        {/* <h3 > Timeline </h3> */}
        <Posts>
        {this.state.posts.map(post => (
        <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
          <div className = "post-text">
                <Link to={`/post/${post._id}`}>
               
                <div className="name-genre-wrap">
                  <Link to={`/user/otherUser/${post.author._id}` }> 
                    <div  className="post-author-name"     
                    data-author-id={post.author._id} data-author={post.author.name}>{post.author.name}  </div>
                  </Link>
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
              <p><i className="far fa-heart"></i>{post.likes.length} </p>
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
export default AllPosts;