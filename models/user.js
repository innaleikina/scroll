const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, //encrypt!
  following: {
    type: Schema.Types.ObjectId
  },
  followers: {
    type: Schema.Types.ObjectId
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  postsLiked: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;