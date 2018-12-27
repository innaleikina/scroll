const router = require("express").Router();
const userRoutes = require("./api/user");
const commentRoutes = require("./api/comment");
const postRoutes = require("./api/post");
const path = require("path")


// Book routes
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/post", postRoutes);

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = router;
