import React, { Component } from 'react';
import AllPosts from "../AllPosts";
import {Input, Button} from "../../components/form"
import {Option, Select} from "../../components/select"
import "./search.css"
import API from '../../utils/API';


class Search extends Component {

    state = {
        genreSelected: [],
        genre:"Genre",
        type:"User",
        category:"Chapter",
        sortBy:"Newest",
        postsFound:"",
        query:"",
        searchPerformed: false
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

      log = () => {
        console.log(this.state.genre);  
        console.log(this.state.type);
        console.log(this.state.category);  
        console.log(this.state.sortBy);  
      }

      performSearch = () => {
        if(this.state.type === "Post"){
        API.findPostBySearch(this.state.query)
        .then(res =>
            this.setState({
                
                postsFound:res.data,
                searchPerformed: true
            }, console.log(res.data))
         )
         } else if (this.state.type ==="User"){
            API.findUserBySearch(this.state.query)
            .then(res =>
            this.setState({
                
                postsFound:res.data,
                searchPerformed: true
            }, console.log(res.data))
        )
        }
      }

      onSearchClick = () => {
          this.log();
          this.performSearch();
      }

    render() {
        return (
            <div className="search-wrap">
                 <div className="search-btn-wrap">
                    <Input name="query" onChange={this.handleInputChange} className="search-input" placeholder="search term"></Input>
                    
                    <Select name="type" value = {this.state.type} onChange={this.handleSelectChange}  id="type-search" placeholder="type">
                        <Option value="User"> User  </Option>
                        <Option value="Post"> Post </Option>
                    </Select>

                    <Button onClick={this.onSearchClick}> Search </Button>
                 </div>
                 
                 
                 <div className="select-all">

                     <Select name="category" value = {this.state.category} onChange={this.handleSelectChange} id="category-search" placeholder="category">
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


                    <Select name="sortBy" value = {this.state.sortBy} onChange={this.handleSelectChange} id="category-search"  placeholder="sort by">
                        <Option> Newest  </Option>
                        <Option> Most Liked  </Option>
                    </Select>
                </div>
                 

                 {!this.state.searchPerformed ? <AllPosts user={this.props.user} ></AllPosts> : <div> Search Performed</div> }
              
               
                
            </div>
        );
    }
}

export default Search;