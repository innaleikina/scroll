import axios from "axios";

export default {
  // Gets all posts
  getPosts: function() {
    return axios.get("/post/all");
  },
  // Gets one post
  getPost: function(id) {
    return axios.get("/post/" + id);
  },

  getPostsFollowing: function(followingID) {
    return axios.get("/post/following/" + followingID);
  },

  //delete one post
  deletePost: function(id) {
    return axios.delete("/post/" + id);
  },
  //post comment
  postComment: function(userid,id, commentData) {
    return axios.post("/comment/" + userid +"/"+ id , commentData);
  },
 //post a post
 postPost: function(userid , postData){
   return axios.post("/post/add/" + userid , postData)
 },


  deleteComment: function(commentId){
    return axios.delete("/comment/" + commentId)
  },

  createUser: function(userData) {
    return axios.post("/user", userData);
  },

  getUserById: function(id){
    return axios.get("/user/" + id);
  },

  getUser: function(userLogin) {
    return axios.post("/user/login", userLogin);
  },

  findPostBySearchWord: function(search) {
    console.log("post search");
    return axios.get("/post/search/" + search )
  },
  
  findUserBySearch: function(search) {
    console.log("post search");
    return axios.get("/user/search/" + search )
  },

  fetchUser: function() {
    return axios.get("/user/fetch");
  },

  getProfile: function(id) {
    return axios.get("/user/otherUser/" + id);
  },

  followUser: function(loggedInId, otherUserId){
    return axios.put("/user/follow/" + loggedInId + "/" + otherUserId);
  },

  logout: function() {
    return axios.get("/user/logout/");
  },

  likePost: function(postId, userId) {
    console.log(postId, userId);
    return axios.put("/post/like/" + postId + "/" + userId);
  }

};
