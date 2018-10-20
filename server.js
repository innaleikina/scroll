const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require("passport");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scroll");

////SETTING UP PASSPORT START---------------------------------------------------
// app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

////SETTING UP PASSPORT END---------------------------------------------------

app.listen(PORT, () => {
  console.log('Running on port:', PORT);
})