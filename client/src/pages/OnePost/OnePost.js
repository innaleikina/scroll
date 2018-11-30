import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import  "./onePost.css";
import {Button} from "../../components/form";

import CommentPopup from "../../components/commentPopup";


class OnePost extends Component {

    state = {
        //grabs the post id from the url
        postId: this.props.match.params.id,
        authorName: "",
        post:{},
        likes: [],
        comments:[],
        commentPopUpShown:false,
        chunks:[],
        authorId: "",
        activeChunk:0,
        postAuthor: this.props.match.params.userid,
        loggedInUser:"",
        dropDownShown:false,
        postLiked :false
      
        //if false no render, if true, render 

    }

    componentDidMount() {
        this.loadPost();
        this.setState({loggedInUser: this.props.user._id})
    }



    loadPost = () => {
        this.setState({
            chunks:[],
        });


            API.fetchUser()
            .then(res => this.setState({
            loggedInUser: res.data
            }), console.log("success"))
            .catch(err => console.log(err))
        
        

        API.getPost(this.state.postId)
            .then(res =>
                this.setState({
                    post: res.data,
                    likes: res.data.likes,
                    comments: res.data.comment,
                    authorName : res.data.author.name,
                    authorId:res.data.author._id,
                }, this.chunkSubstr(res.data.content, 1000))
            ).then(res => this.checkIfLiked())
            .catch(err => console.log(err));
   

    };

    checkIfLiked = () => {
        console.log(this.state.likes);
        console.log("testing if post was liked before");
        if (this.state.likes.includes(this.state.loggedInUser._id)) {
            console.log("user id was included");
            this.setState({
                postLiked: true
            }) 
           }
    }

    //Toggle to show an hide comment input
     openCommentPopup = () => {
         if(this.state.commentPopUpShown === false){
       this.setState({
           commentPopUpShown: true
       })
      } 
    }

    closePopUp = ()  => {

        console.log('pop up close clicked');
        if(this.state.commentPopUpShown === true){
            this.setState({
                commentPopUpShown: false
            })
        }
}
   

    deletePost = event => {
        event.preventDefault();
        API.deletePost(this.state.post._id)
          .then(res =>
            this.props.history.push("/user/otherUser/" + res.data.author)
            )
        console.log("post deleted");
    }

    deleteComment = id => {

        API.deleteComment(id);
        this.loadPost();
    }


      chunkSubstr = (str, size) => {
       
        const numChunks = Math.ceil(str.length / size)
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            this.setState({
                chunks:[],
                chunks: this.state.chunks.concat(str.substr(o, size))
            })
        }
      }

      //renders different text to the post component depending on which page number is clicked
      handlePageClick = (e) => {
          e.preventDefault();
          this.setState({
              activeChunk: e.target.id
          })
        //   console.log(this.state.activeChunk);
      }

      //handle liking posts
      handleLikes = (event) => {
        event.preventDefault();
       
          API.fetchUser()
            .then(res => this.apiLikeHit(res))
            .catch(err => console.log(err));
      }

      apiLikeHit = (res) => {
          if (this.state.likes.includes(res.data._id)) {
            console.log("you've already liked this post");
            this.setState({
                postLiked: true
            })
          } else {
            API.likePost(this.state.post._id, res.data._id)
            .then(res => console.log("liked post"))
            .then(API.getPost (this.state.post._id)
              .then(res => this.setState({
                likes: res.data.likes,
                postLiked:true
              }, console.log(this.state.likes)))
            )
            .catch(err => console.log(err))
          }
        }
        
            
        showDropDown = () =>{
          if(!this.state.dropDownShown){
              document.getElementById("myDropdown").style.display = "flex";
              this.setState({
                  dropDownShown:true
              })
          } else {
            document.getElementById("myDropdown").style.display = "none";
            this.setState({
                dropDownShown:false
            })
          }
        }

        

  render() {
   
    console.log(this.state.likes);
          return (
        <div className="one-post-wrap">
        
          <div className="author-all">


           <Link to={"/user/otherUser/" + this.state.authorId}>   <p id="one-post-author"> {this.state.authorName}</p></Link>
           
            {/* this will have functionality to edit and delete posts  */}
              
              {(this.state.loggedInUser._id === this.state.authorId) ?
               <div className="author-menu">
                  <i onClick={this.showDropDown}  className="fas fa-ellipsis-h"></i>
                  <div id="myDropdown" className="dropdown-content">
                    <ul className="post-menu-ul">
                        <li onClick={this.deletePost} className="delete-post-btn post-menu-li">Delete Post</li>
                        <li className="post-menu-li">
                            Edit post
                        </li>
                    </ul>
                   
                  </div>
               </div>
               :<div></div> 
              }
              
               
              {/* */}
            </div>
            {/* ===== TEXT OF THE POST ====== */}
            <div className="one-post" >
               <p>{this.state.chunks[this.state.activeChunk]}
                {this.state.chunks.length > 1? <span>- </span>: <span></span>}</p>
               
            </div>
             {/* ===== PAGINATION ====== */}
             <div className="pagination">
                {(this.state.chunks.length > 1) ?this.state.chunks.map((page,index) => (
                <div key={index} id={index} onClick={this.handlePageClick}  className="page-num">{index+1}</div>
                )) :<div></div>}
             </div>

             {/* ===== POST BUTTONS ====== */}
               <div className="buttons-text-wrap">
                <div className="one-post-buttons">
                        {this.state.postLiked ?<Button className="liked"><i id="liked" className="one-post-i far fa-heart icon-btn"></i></Button> : <Button  className="button-one-post" onClick={this.handleLikes}><i className="one-post-i far fa-heart icon-btn"></i> </Button>}

                        <Button className="button-one-post" onClick={this.openCommentPopup}><i className="one-post-i far fa-comment icon-btn"></i> </Button>
                    </div>
                    <div className="like-comments-text">
                        <div>{this.state.likes.length} likes</div>
                        <div>{this.state.comments.length} comments</div>
                    </div>
                </div>
           
           
            {/* MAP FUNCTION TO GET COMMENTS */}
            <div className="one-post-comments">
                {this.state.comments.map(comment => (
                
                <div  key={comment._id}>
                    <div  className="one-comment">
                       <div className="comment-text">
                          <span className="comment-author">{comment.author}</span> {comment.content} 
                        </div>
                        {this.state.loggedInUser._id === comment.authorId ? <div><Button data-id={comment._id} onClick={() => this.deleteComment(comment._id)} className="trash-icon"> <i className="far fa-trash-alt icon-btn"></i> </Button></div> : <div></div>}
                     </div>
                     
                </div>
                
                ))}
            </div>
           

            {/* ======COMMENT MODULE (WILL MAKE OWN COMPONENT)======= */}
                {this.state.commentPopUpShown ? <CommentPopup closePopUp={this.closePopUp}  loadPost={this.loadPost} postId={this.state.postId} loggedInUserID={this.state.loggedInUser} loggedInUserName={this.props.user.name}/> : <div></div> }

            
        </div>
    );
  }
}
export default OnePost;