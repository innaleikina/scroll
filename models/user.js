const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  following: {
    type: Array
  },
  followers: {
    type: Array
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
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

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;