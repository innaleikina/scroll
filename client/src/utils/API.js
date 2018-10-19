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
  
  postComment: function(userid,id) {
    return axios.post("/comment/" + userid +"/"+ id);

  },
  // Deletes the book with the given id
  
  // Saves a book to the database
  getComment: function(commentId) {
    return axios.get("comment/", commentId);
  },

  createUser: function(userData) {
    console.log(userData);
    return axios.post("/user", userData);
  }
};
