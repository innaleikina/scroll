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
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articlesData) {
    return axios.post("/api/articles", articlesData);
  },

  getAuthor: function(id) {
    return axios.get("/user/" + id);
  }
};
