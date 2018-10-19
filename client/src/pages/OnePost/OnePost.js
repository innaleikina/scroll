import React, { Component } from 'react';
import API from "../../components/utils/API";
import  "./onePost.css";
import {Button} from "../../components/form";
import {CommentPopup} from "../../components/commentPopup";


class OnePost extends Component {

    state = {
        //grabs the post id from the url
        postId: this.props.match.params.id,
        userId: "",
        post:{},
        comments:[],
        commentPopUpShown:false
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
                    userId : res.data.author._id
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

     handleInputChange = event => {
        const {
            name,
            value
        } = event.target;
        this.setState({
            [name]: value
        });
    };

    saveComment = (event) => {
        event.preventDefault();
        var body = "comment dummy hard coded from front end"
        API.postComment(this.state.userId,this.state.postId, );
        console.log("comment posted");
        API.getPost(this.state.postId)
        .then(res =>
            this.setState({
             
                comments:res.data.comment,
            }, console.log(res.data))
        )
        .catch(err => console.log(err));
       
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
          <div  key={comment}>
             <p  data-comment={comment._id}>{comment.content}  </p>
           </div>
           ))}
        {/* ======COMMENT MODULE (WILL MAKE OWN COMPONENT)======= */}
         {this.state.commentPopUpShown ? <CommentPopup onChangeValue={this.handleInputChange} onClickButton={this.saveComment}/> : <div></div> }
       
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