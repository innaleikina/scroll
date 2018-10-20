import axios from "axios";

export default {
  // Gets all books
  getPosts: function() {
    return axios.get("/post/all");
  },
  // Gets the book with the given id
  getPost: function(id) {
    return axios.get("/post/" + id);
  },
  deletePost: function(id) {
    return axios.delete("/post/" + id);
  },
  
  postComment: function(userid,id, commentData) {
    return axios.post("/comment/" + userid +"/"+ id , commentData);

  },
  // Deletes the book with the given id
  
  // Saves a book to the database
  getComment: function(commentId) {
    return axios.get("comment/", commentId);
  },

  createUser: function(userData) {
    return axios.post("/user", userData);
  },

  getUser: function(userLogin) {
    return axios.post("/user/login", userLogin);
  }
};
