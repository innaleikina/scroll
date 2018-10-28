import React, { Component } from 'react';
import AllPosts from "../AllPosts";
import {Input, Button} from "../../components/form"
import {Option, Select} from "../../components/select"
import {Posts, PostItem} from "../../components/post"
import ellipsize from 'ellipsize';


import {SearchResults} from "../../components/searchResults"

import "./search.css"
import API from '../../utils/API';


class Search extends Component {

    state = {
        genreSelected: [],
        genre:"",
        category:"User",
        type:"",
        // sortBy:"",
        results:[],
        query:"",
        searchPerformed: false,
     
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

      performSearch = () => {
          //if category is post and query string is not empty
        if(this.state.category === "Post" && this.state.query !== ""){
        API.findPostBySearchWord(this.state.query)
        .then(res =>
            this.setState({
                
                results:res.data,
                searchPerformed: true
            }, console.log(res.data))
          ) //if category is post and type is not empty
         } else if (this.state.category === "User"){
             if(this.state.query === ""){
                 alert("You must enter a search term")
             }
              API.findUserBySearch(this.state.query)
             .then(res =>
             this.setState({
                
                results:res.data,
                searchPerformed: true
            }, console.log(res.data))
          )
        }
      }

      onSearchClick = () => {
 
          this.performSearch();
      }

    render() {
        return (
            <div className="search-wrap">
                 <div className="search-btn-wrap">
                    <Input name="query" onChange={this.handleInputChange} className="search-input" placeholder="search term"></Input>
                    
                    <Select name="category" value = {this.state.category} onChange={this.handleSelectChange}  id="category-search" placeholder="type">
                        <Option value="User"> User  </Option>
                        <Option value="Post"> Post </Option>
                    </Select>

                    <Button onClick={this.onSearchClick}> Search </Button>
                 </div>
                 

                  {this.state.category === "User" ? <div ></div> : 
                 
                 <div className="select-all">

                     <Select name="type" value = {this.state.type} onChange={this.handleSelectChange} id="category-search" placeholder="category">
                       <Option> Select Type </Option>
                        <Option> Chapter  </Option>
                        <Option> Poetry  </Option>
                        <Option> Short Story  </Option>
                    </Select>
                    

                      <Select  name="genre" value = {this.state.genre} onChange={this.handleSelectChange} id="genre-search" placeholder="genre">
                        <Option> Select Genre </Option>
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
                 } 
                 
                {/* ======== RENDER ALL POSTS BEFORE SEARCH IS PERFORMED, AFTER SEARCH ONLY RENDER RESULTS */}
                 {!this.state.searchPerformed ? <AllPosts user={this.props.user} ></AllPosts> :       
                   <SearchResults>

                       {/* A nested if statement. If results is empty render that it's empty, if category is user, render user data, if category is post, render post data */}
                       {this.state.results === "" ? <div className="no-result"> No Results Found</div> :         
                          this.state.category === "User" ? this.state.results.map(result => (
                             <div  key={result._id}>
                              <a href={`/user/otherUser/${result._id}`}>{result.name}</a>
                            </div>
                            )) :  
                            <Posts>
                            {this.state.results.map(result => (
                              <PostItem key={result._id}>
                                  <div className = "post-text">
                                        <a href={`/post/${result._id}`}>
                                    
                                        <div className="name-genre-wrap">
                                        <a href={`/user/otherUser/${result.author._id}` }> 
                                            <div  className="post-author-name"     
                                            data-author-id={result.author._id} data-author={result.author.name}>{result.author.name}  </div>
                                        </a>
                                        <div className="small-text">{result.genre}</div>
                                        </div>

                                        <div className="title-type-wrap">
                                            <h6 className="post-title">{result.title}</h6>
                                    
                                            <p className="small-text">{result.type}</p>
                                        </div> 
                                        
                                        
                                            <p className="content-text"  data-post={result._id}> {ellipsize(result.content, 300)} </p>
                                        </a>
                                </div>
                                <div className="post-data">
                                    <p> <i className="far fa-heart"></i>{result.likes} </p>
                                    <p><i className="far fa-comment"></i>{result.comment.length} </p>
                                </div>
                              </PostItem> 
                            )) }
                            </Posts> }

                 
                 
                  
                 </SearchResults> }
              
               
                
            </div>
        );
    }
}

export default Search;