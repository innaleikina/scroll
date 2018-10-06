const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;