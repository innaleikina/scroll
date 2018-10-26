const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  updated: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default:0,
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;