const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");

//auth definitions and variables start -----------------------------------------------------------------
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
  FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
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

//auth FB login start --------------------------------------------------------------------------------
passport.use(new FacebookStrategy({
  clientID: "1993823350674672",
  clientSecret: "47b8126ed2719a0c09aed4354c99c52f",
  callbackURL: "https://localhost:3000/user/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log("inside callback function");
  db.User.findOne({"email": "oserenchenko@gmail.com"}, function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));
//auth FB login end --------------------------------------------------------------------------------

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}

// Matches with "/user"
router.route("/")
  .post(userController.create);

///user/all
router.route("/all")
  .get(userController.findAll);

//auth /user/login
router.route("/login")
  .post(passport.authenticate('local'), function(req, res) {
    res.json(req.user);
  });

// //fb login /user/facebook
// router.route("/facebook")
//   .get(
//     passport.authenticate('facebook')
//     // , {scope : ['public_profile', 'email']})
//     )

//fb callback /user/facebook/callback
// router.route("/facebook/callback")
//   .get(passport.authenticate('facebook', { successRedirect: '/home',
//   failureRedirect: '/login' }));

router.route('/fetch').get(userController.fetch);

// Matches with "/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
