import React, { Component } from 'react';
import {List, ListItem} from "../../list";
import API from "../../utils/API";



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
        <div>
        <h3> Timeline </h3>
        <List>
        {this.state.posts.map(post => (
        <ListItem key={post._id}>
           <p data-post={post._id}>{post.content}  by {post.author}  </p>
           {/* <Button onClick={() => this.deleteArticle(article._id)}> delete </Button> */}
        </ListItem>
        ))}
    </List>
    </div>
    );
  }
}
export default Timeline;