import React, { Component } from 'react';
import API from "../../utils/API";
import  "./onePost.css";
import {Button} from "../../components/form";
import CommentPopup from "../../components/commentPopup";


class OnePost extends Component {

    state = {
        //grabs the post id from the url
        postId: this.props.match.params.id,
        userId: "",
        post:{},
        comments:[],
        commentPopUpShown:false,
      
        //if false no render, if true, render 

    }

    componentDidMount() {
        this.loadPost();
    }

    loadPost = () => {
        API.getPost(this.state.postId)
            .then(res =>
                this.setState({
                    post: res.data,
                    comments:res.data.comment,
                    userId : res.data.author
                }, console.log(res.data))
            )
            .catch(err => console.log(err));
    };

    //Toggle to show an hide comment input
     openCommentPopup = () => {
         console.log(this.state.commentPopUpShown);
         if(this.state.commentPopUpShown === false){
       this.setState({
           commentPopUpShown: true
       })
      } else {
        this.setState({
            commentPopUpShown: false
        })
      }
    }
   

    deletePost = event => {
        event.preventDefault();
        API.deletePost(this.state.postId);
        console.log("post deleted");
    }


  render() {

    return (
        <div >
          <h3> One Post</h3>
          <h6>  Post Content</h6>
          <p>{this.state.post.content}</p>
          <h6> Comments </h6>
         {/* MAP FUNCTION TO GET COMMENTS */}
          {this.state.comments.map(comment => (
          <div  key={comment._id}>
             <p  data-comment={comment._id}>{comment.content}  </p>
           </div>
           ))}
        {/* ======COMMENT MODULE (WILL MAKE OWN COMPONENT)======= */}
         {this.state.commentPopUpShown ? <CommentPopup  loadPost={this.loadPost} postId={this.state.postId} /> : <div></div> }
       
        {/* ======BUTTONS======= */}
          <h6> Buttons </h6>
          <Button onClick ={this.deletePost}> delete post </Button>
          <Button > delete comment </Button>
          <Button onClick={this.openCommentPopup}> add comment </Button>
        </div>
    );
  }
}
export default OnePost;