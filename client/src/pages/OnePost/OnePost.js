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
        chunks:[]
      
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
                    authorName : res.data.author.name
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
      } 
    }

    closePopUp = (e)  => {
        e.preventDefault();
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
        this.this.setState({
            chunks: new Array(numChunks)
        })
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            this.setState({
                chunks: this.state.chunks.concat(str.substr(o, size))
            })
            console.log(this.state.chunks);
        }
      
        // this.setState({
        //     chunks:chunks
        // })
        
      }

      

  render() {
    console.log(this.state.post.content)
    return (
        <div className="one-post-wrap">
          <div className="author-all">
              <p id="one-post-author"> {this.state.authorName}</p>
            {/* this will have functionality to edit and delete posts  */}
            
              <div className="author-menu"><i className="fas fa-ellipsis-h"></i></div>
            </div>
            <div className="one-post" >
               <p>{this.state.post.content}</p>
            </div>


               <div className="buttons-text-wrap">
                <div className="one-post-buttons">
                        <Button  className="button-one-post" onClick={this.openCommentPopup}><i className="far fa-heart"></i> </Button>
                        <Button className="button-one-post" onClick={this.openCommentPopup}><i className="far fa-comment"></i> </Button>
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
                     <Button className="trash-icon" > <i className="far fa-trash-alt"></i> </Button> </div>
                </div>
                
                ))}
            </div>
           

            {/* ======COMMENT MODULE (WILL MAKE OWN COMPONENT)======= */}
                {this.state.commentPopUpShown ? <CommentPopup closePopUp={this.closePopUp}  loadPost={this.loadPost} postId={this.state.postId} /> : <div></div> }
                
            {/* ======BUTTONS======= */}
            <h6> Buttons </h6>
            <Button onClick ={this.deletePost}> delete post </Button>
          
            
        </div>
    );
  }
}
export default OnePost;