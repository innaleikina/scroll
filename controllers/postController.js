const db = require("../models");


// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Post
      .find(req.query)
      .populate("author")
      .populate("comment")
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Post
      .findById(req.params.id)
      .populate("comment")
      .populate("author")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBySearch: function(req,res){
    db.Post
    .find({"content":
    { "$regex": req.params.search , "$options": "i" }
    })
    //      /.*son.*/i
     .sort({
      date: -1
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  getFollowing: function(req,res){
    db.Post
    .find({"author": req.params.followingID}
    )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    // const userID = req.params.id;
    db.Post
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Post
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Post
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};