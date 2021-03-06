const router = require("express").Router();
const userController = require("../../controllers/userController");
const db = require("../../models");

//auth definitions and variables start -----------------------------------------------------------------
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


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

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (userId, done) {
  db.User.findById(userId, (err, user) => done(err, user));
});

//auth definitions and variables end -----------------------------------------------------------------

// Matches with "/user"
router.route("/")
  .post(userController.create);

///user/all
router.route("/all")
  .get(userController.findAll);

//auth /user/login
router.route("/login")
  .post(passport.authenticate('local', {
    // successRedirect: '/home',
    failureRedirect: '/'
  }), function (req, res) {
    res.json(req.user);
  });

//logout
router.route("/logout")
  .get(function(req, res){
    req.logout();
    res.redirect('/');
  })

router.route('/fetch').get(userController.fetch);


router.route("/otherUser/:id").get(userController.findById);


router.route("/follow/:loggedinid/:otherid").put(userController.update);
// router.route("/follow/:loggedinid/:otherid").put(userController.updateFollowers);



//Search by userName
router
  .route("/search/:search")
  .get(userController.findBySearch)

// Matches with "/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;