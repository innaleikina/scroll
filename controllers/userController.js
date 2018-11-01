const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .populate("posts")
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .populate("posts")
      .populate("following")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findBySearch: function (req, res) {
    db.User
      .find({
        "name": {
          $regex: new RegExp("^" + req.params.search.toLowerCase(), "i")
        }
      })
      .populate("post")
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({
        _id: req.params.loggedinid
      }, {
        $push: {
          following: req.params.otherid
        }
      }, {
        new: true
      })
      .then(
        dbUser => db.User.findOneAndUpdate({
        _id: req.params.otherid
      }, {
        $push: {
          followers: req.params.loggedinid
        }
      }, {
        new: true
      }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fetch: function (req, res) {
    res.json(req.user);
  }
}