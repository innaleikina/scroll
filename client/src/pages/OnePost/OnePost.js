import React, { Component } from 'react';
import API from "../../components/utils/API";
import  "./onePost.css";
import queryString from 'query-string';


class OnePost extends Component {

    state = {
        //grabs the post id from the url
        postId: this.props.match.params.id,
        post:{},
        comments:[]

    }

    componentDidMount() {
        this.loadPost();
    }

    loadPost = () => {
        API.getPost(this.state.postId)
            .then(res =>
                this.setState({
                    post: res.data,
                    comments:res.data.comment
                }, console.log(res.data.comment))
            )
            .catch(err => console.log(err));
    };


  render() {

    return (
        <div >
          <h3> One Post</h3>
          <h6>  Post Content</h6>
          <p>{this.state.post.content}</p>
          <h6> Comments </h6>
         
          {this.state.comments.map(comment => (
        <div  key={comment._id}>
        
           
                 <p  data-comment={comment._id}>{comment.content}  </p>

       
        </div>
        ))}
        </div>
    );
  }
}
export default OnePost;