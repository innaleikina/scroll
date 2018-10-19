import React, { Component } from 'react';
import {Posts, PostItem} from "../../components/post";
import API from "../../components/utils/API";
import  "./timeline.css";


class Timeline extends Component {

    state = {
        posts: []
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
        <div >
        <h3> Timeline </h3>
        <Posts>
        {this.state.posts.map(post => (
        <PostItem  key={post._id}>
          {/* p wrapped in a with href to make going to the OpenPost page possible */}
           <a href={`/post/${post._id}`}>
                 <p  data-post={post._id}>{post.content}  by {post.author.username}  </p>
           </a>
           {/* <Button onClick={() => this.deleteArticle(article._id)}> delete </Button> */}
        </PostItem>
        ))}
    </Posts>
    </div>
    );
  }
}
export default Timeline;