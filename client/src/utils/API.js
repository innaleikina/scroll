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
  //delete one post
  deletePost: function(id) {
    return axios.delete("/post/" + id);
  },
  //post comment
  postComment: function(userid,id, commentData) {
    return axios.post("/comment/" + userid +"/"+ id , commentData);
  },
 //post a post
 postPost: function(userid){
   return axios.post("/post/" + userid)
 },
  
  // Saves a book to the database
  getComment: function(commentId) {
    return axios.get("comment/", commentId);
  },

  createUser: function(userData) {
    return axios.post("/user", userData);
  },

  getUser: function(userLogin) {
    return axios.post("/user/login", userLogin);
  },

  fetchUser: function() {
    return axios.get("/user/fetch");
  },

  getProfile: function(id) {
    return axios.get("/user/otherUser/" + id);
  },

  followUser: function(loggedInId, otherUserId){
    console.log(loggedInId)
    return axios.put("/user/follow/" + loggedInId + "/" + otherUserId);
  }

  // getFBUser: function() {
  //   console.log("api works");
  //   return axios.get("/user/facebook")
  // },

};
