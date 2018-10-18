const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }]
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;