import React, { Component } from 'react';
import "./addPost.css"
import {Button, TextArea, Input} from "../../components/form"

import API from "../../utils/API";


class AddPost extends Component {

   state ={
    //hard coded user id while we work on auth   
    userId: this.props.userId,
    //will use the params.id when auth works
    // userId: this.props.match.params.id,
    textArea: "test in state post",
    userName: "test",
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
  
  
  savePost = () => {
   //post id is coming fromt he url param, being passed from theOne Post parent component to this component through props.
    API.postPost(this.state.userId, {
      author: this.state.userId,
      content: this.state.textArea
    });
    console.log("post posted");
    // window.reirect("/post/")
  }


  onSubmitClick = (e) => {
    e.preventDefault();
    this.saveComment();

  }

  displayProps = (props) => {
    console.log(props);
  }
  

  render(){
    this.displayProps();
    return( 

  <form className="pop-up" >
  <h3> ADD POST </h3>

    {/* {props.children} */}
    <Button> X </Button>
    <TextArea name="textArea" value={this.state.textArea} id="textArea" onChange={this.handleInputChange} />
    <Input name="authorPost" value={this.state.userName} id="authorPost" onChange={this.handleInputChange}/>
    {/* <Button > Save Comment </Button> */}
    <Input onClick={this.onSubmitClick}  type="submit" value="Submit"/>
  </form>
    )

  }
}

export default AddPost;