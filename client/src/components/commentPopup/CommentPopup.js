import React, { Component } from 'react';
import "./commentPopup.css"
import {Button, TextArea, Input} from "../form"

import API from "../../utils/API";


class CommentPopup extends Component {

   state ={
    userId: "5bc94c9710e5551e7e8d6db5",
    textArea: "Enter your comment here",
    authorComment: "author name soon to be deleted ",
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
  }



  render(){
    return( 
  <form className="pop-up" >
    {/* {props.children} */}
    <Button onClick={this.props.closePopUp} id="close-pop-up"> X </Button>
    <TextArea name="textArea" value={this.state.textArea} id="textArea" onChange={this.handleInputChange} />
    <Input name="authorComment" value={this.state.authorComment} id="authorComment" onChange={this.handleInputChange}/>
    {/* <Button > Save Comment </Button> */}
    <Input onClick={this.onSubmitClick}  type="submit" value="Submit"/>
  </form>
    )

  }
}

export default CommentPopup;