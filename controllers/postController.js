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
  findBySearchWord: function (req, res) {
    db.Post
      .find({
        $and: [{
            //search for content and titles of posts
            $or: [{
              "content": {
                "$regex": req.params.search,
                "$options": "i"
              }
            }, {
              "title": {
                "$regex": req.params.search,
                "$options": "i"
              }
            }]
          }

        ]
      })
      .populate("author")
      //      /.*son.*/i
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByGenre: function (req, res) {
    db.Post
      .find({
        $and: [{
            //search for genre of posts
              "genre": {
              "$regex": req.params.genre,
              "$options": "i"
            }
          }

        ]
      })
      //      /.*son.*/i
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByType: function (req, res) {
    db.Post
      .find({
        $and: [{
            //search for genre of posts
              "type": {
              "$regex": req.params.type,
              "$options": "i"
            }
          }

        ]
      })
      //      /.*son.*/i
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getFollowing: function (req, res) {
    db.Post
      .find({
        "author": req.params.followingID
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const userID = req.params.id;
    console.log(userID);
    db.Post
      .create(req.body)
      .then(
        dbPost => db.User.findOneAndUpdate({
        _id: userID
      }, {
        $push: {
          posts: dbPost._id
        }
      }, {
        new: true
      }))
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
  },

  updateLikes: function(req, res) {
    db.Post
      .findOneAndUpdate({
        _id: req.params.postid
      }, {
        $push: {
        likes : req.params.userid
      }
    })
    .then(dbPost => res.json(dbPost))
    .catch(err => res.status(422).json(err));
  }

};