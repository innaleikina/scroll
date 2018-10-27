import React, { Component } from 'react';
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
        comments:[],
        commentPopUpShown:false,
        chunks:[],
        authorId: "",
        activeChunk:0,
        loggedInUser: ""
      
        //if false no render, if true, render 

    }

    componentDidMount() {
        this.loadPost();
        this.setState({loggedInUser: this.props.user._id})
    }



    loadPost = () => {
        API.getPost(this.state.postId)
            .then(res =>
                this.setState({
                    post: res.data,
                    comments:res.data.comment,
                    authorName : res.data.author.name,
                    authorId:res.data.author._id
                }, this.chunkSubstr(res.data.content, 1000))
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
        API.deletePost(this.state.postId);
        console.log("post deleted");
    }


      chunkSubstr = (str, size) => {
        console.log("chunks subst start");
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
          console.log(this.state.activeChunk);
      }
      

  render() {
    return (
        <div className="one-post-wrap">
          <div className="author-all">
          <p>{this.props.user.name}</p>
           <a href={"/profile/" + this.state.authorId}>   <p id="one-post-author"> {this.state.authorName}</p></a>
            {/* this will have functionality to edit and delete posts  */}
            
              <div className="author-menu"><i className="fas fa-ellipsis-h"></i></div>
            </div>
            {/* ===== TEXT OF THE POST ====== */}
            <div className="one-post" >
               <p>{this.state.chunks[this.state.activeChunk]}-</p>
               
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
                        <Button  className="button-one-post" onClick={this.openCommentPopup}><i className="far fa-heart icon-btn"></i> </Button>
                        <Button className="button-one-post" onClick={this.openCommentPopup}><i className="far fa-comment icon-btn"></i> </Button>
                    </div>
                    <div className="like-comments-text">
                        <div>{this.state.post.likes} likes</div>
                        <div>{this.state.comments.length} comments</div>
                    </div>
                </div>
           
           
            {/* MAP FUNCTION TO GET COMMENTS */}
            <div className="one-post-comments">
                {this.state.comments.map(comment => (
                <div  key={comment._id}>
                    <div  className="one-comment" data-comment={comment._id}>
                    <div className="comment-text"><span className="comment-author">{comment.author}</span> {comment.content}  </div>
                     <Button className="trash-icon" > <i className="far fa-trash-alt icon-btn"></i> </Button> </div>
                </div>
                
                ))}
            </div>
           

            {/* ======COMMENT MODULE (WILL MAKE OWN COMPONENT)======= */}
                {this.state.commentPopUpShown ? <CommentPopup closePopUp={this.closePopUp}  loadPost={this.loadPost} postId={this.state.postId} loggedInUserID={this.state.loggedInUser} loggedInUserName={this.props.user.name}/> : <div></div> }
                
            {/* ======BUTTONS======= */}
            <h6> Buttons </h6>
            <Button onClick ={this.deletePost}> delete post </Button>
          
            
        </div>
    );
  }
}
export default OnePost;