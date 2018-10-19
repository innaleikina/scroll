const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scroll");

////SETTING UP PASSPORT START---------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  User.findById(userId, (err, user) => done(err, user));
});

// const local = new LocalStrategy((username, password, done) => {
//   User.findOne({ username })
//     .then(user => {
//       if (!user || !user.validPassword(password)) {
//         done(null, false, { message: "Invalid username/password" });
//       } else {
//         done(null, user);
//       }
//     })
//     .catch(e => done(e));
// });
// passport.use("local", local);

////SETTING UP PASSPORT END---------------------------------------------------

app.listen(PORT, () => {
  console.log('Running on port:', PORT);
})