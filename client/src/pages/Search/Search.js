import React, { Component } from 'react';
import Timeline from "../Timeline";
import {Input, Button} from "../../components/form"
import {Option, Select} from "../../components/select"
import "./search.css"


class Search extends Component {

    state = {
        genreSelected: [],
        postPreview:""
    }


    render() {
        return (
            <div className="search-wrap">
                 <div className="search-btn-wrap">
                    <Input className="search-input" placeholder="search term"></Input>
                    <Select placeholder="category">
                        <Option> User  </Option>
                        <Option> Post </Option>
                    </Select>

                    <Button> Search </Button>
                 </div>
                 <div className="select-all">

                     <Select placeholder="category">
                        <Option> Chapter  </Option>
                        <Option> Poetry  </Option>
                        <Option> Short Story  </Option>
                    </Select>

                      <Select placeholder="genre">
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


                    <Select  placeholder="sort by">
                        <Option> Newest  </Option>
                        <Option> Most Liked  </Option>
                    </Select>
                </div>
                 <Timeline></Timeline>
               
                
            </div>
        );
    }
}

export default Search;