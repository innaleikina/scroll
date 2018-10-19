const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Comment
      .find(req.query)
      .sort({
        date: -1
      })
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Comment
      .findById(req.params.id)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const postID = req.params.id;
    const userID = req.params.userid;
    db.Comment
      .create(req.body)
      .then(dbComment => db.Post.findOneAndUpdate({
        _id: postID,
      }, {
        $push: {
          comment: dbComment._id
        }
      }, {
        new: true
      }))
  },
  update: function (req, res) {
    db.Comment
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Comment
      .findById({
        _id: req.params.id
      })
      .then(dbComment => dbComment.remove())
      .then(dbComment => res.json(dbComment))
      .catch(err => res.status(422).json(err));
  }
};