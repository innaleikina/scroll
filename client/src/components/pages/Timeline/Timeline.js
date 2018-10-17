import React, { Component } from 'react';
import {Posts, PostItem} from "../../post";
import API from "../../utils/API";
import  "./timeline.css";


class Timeline extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        API.getPosts()
            .then(res =>
                this.setState({
                    posts: res.data,
                })
            )
            
            .catch(err => console.log(err));
    };


  render() {
    return (
        <div >
        <h3> Timeline </h3>
        <Posts>
        {this.state.posts.map(post => (
        <PostItem key={post._id}>
           <p data-post={post._id}>{post.content}  by {post.author}  </p>
           {/* <Button onClick={() => this.deleteArticle(article._id)}> delete </Button> */}
        </PostItem>
        ))}
    </Posts>
    </div>
    );
  }
}
export default Timeline;