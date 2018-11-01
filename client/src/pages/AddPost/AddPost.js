import React, { Component } from 'react';
import "./addPost.css"
import { TextArea, Input} from "../../components/form";
import {Option, Select} from "../../components/select";

import API from "../../utils/API";


class AddPost extends Component {

   state ={
    //hard coded user id while we work on auth   
    userId: this.props.user._id,
    //will use the params.id when auth works
    // userId: this.props.match.params.id,
    textArea: "",
    authorPost: this.props.user.name,
    title:"",
    genre:"Science",
    type:"Chapter"
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

  handleSelectChange = event => {
    // event.preventDefault();
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
      content: this.state.textArea,
      title: this.state.title,
      genre: this.state.genre,
      type: this.state.type
    })
      .then(res => 
        this.props.history.push("/post/" + res.data.posts[res.data.posts.length - 1])
        )
      .catch(err => console.log(err))
  };
    // console.log("post posted");
    // this.props.history.push("/post/");
    // window.reirect("/post/")
    // console.log(this.state.userId)
    // console.log(this.state.textArea)
    // console.log(this.state.title)
    // console.log(this.state.genre)
    // console.log(this.state.type)
 


  onSubmitClick = (e) => {
    e.preventDefault();
    this.savePost();

  }

  


  render(){
    // console.log(this.props.user._id);
    return( 
      <div className="add-post-wrap">
        <form className="pop-up-post" >
        <h3 id="add-post-h3"> ADD POST </h3>
          {/* {props.children} */}

           <div className="select-all">
          <Select name="type" value = {this.state.type} onChange={this.handleSelectChange} id="category-search" >
              <Option> Chapter  </Option>
              <Option> Poetry  </Option>
              <Option> Short Story  </Option>
          </Select>

          <Select name="genre" value = {this.state.genre} onChange={this.handleSelectChange} id="genre-search" placeholder="genre">
                        <Option> Science fiction </Option>
                        <Option> Satire </Option>
                        <Option> Drama </Option>
                        <Option> Action and Adventure  </Option>
                        <Option> Romance  </Option>
                        <Option> Mystery  </Option>
                        <Option> Horror  </Option>
                        <Option> Self help  </Option>
                        <Option> Health  </Option>
                        <Option> Travel </Option>
                        <Option> Children's  </Option>
                        <Option> Religion</Option>
                        <Option> Science  </Option>
                        <Option> History  </Option>
                        <Option> Fantasy  </Option>
                    </Select>
                </div>

          <Input name="title" placeholder="enter title" value={this.state.title} id="title-post" onChange={this.handleInputChange}/>

          <TextArea name="textArea" placeholder="enter text" value={this.state.textArea} id="textArea-post" onChange={this.handleInputChange} />
       
          {/* <Button > Save Comment </Button> */}
          <Input id="submit-post" onClick={this.onSubmitClick}  type="submit" value="Submit"/>
        </form>
    </div>
    )

  }
}

export default AddPost;