const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");

//auth definitions and variables start -----------------------------------------------------------------
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log("in local strategy", username);
    console.log("in local strategy", password);
    db.User.findOne({
      email: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, console.log("incorrect password"));
      }
      console.log("found user")
      console.log(user);
      return done(null, user)
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  db.User.findById(userId, (err, user) => done(err, user));
});

//auth definitions and variables end -----------------------------------------------------------------


// Matches with "/user"
router.route("/")
  .post(userController.create)

///user/all
router.route("/all")
  .get(userController.findAll);

// Matches with "/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

//auth /user/login
router.route("/login")
  .post(passport.authenticate('local'), function(req, res) {
    res.json(req.user);
});
  

module.exports = router;
