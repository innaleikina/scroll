import React, { Component } from 'react';
import "./commentPopup.css"
import {Button, TextArea, Input} from "../form"

import API from "../../utils/API";


class CommentPopup extends Component {

   state ={
    userId: this.props.loggedInUserID,
    textArea: "",
    authorComment: this.props.loggedInUserName,
    comments:[]
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
  
  
  saveComment = () => {

     //post id is coming fromt he url param, being passed from theOne Post parent component to this component through props.
    API.postComment(this.props.postId, this.state.userId, {
      author: this.state.authorComment,
      authorId: this.state.userId,
      content: this.state.textArea
    });
    console.log("comment posted");
    API.getPost(this.props.postId)
    .then(res =>
        this.setState({
             
            comments:res.data.comment,
        }, console.log(res.data))
    )
    .catch(err => console.log(err));
   
  }

  //this function call the load post from parent component OnePost
  //and the  saveComment function from this file 
  onSubmitClick = (e) => {
    e.preventDefault();
    this.saveComment();
    this.props.loadPost();
    this.props.closePopUp();
  }



  render(){
    return( 
  <form className="pop-up" >
    {/* {props.children} */}
    <Button onClick={this.props.closePopUp} id="close-pop-up"> X </Button>
    <TextArea id="text-area" name="textArea" placeholder="enter your comment" value={this.state.textArea} id="text-area" onChange={this.handleInputChange} />
    {/* <Button > Save Comment </Button> */}
    <Input className="submit" onClick={this.onSubmitClick}  type="submit" value="Submit"/>
  </form>
    )

  }
}

export default CommentPopup;