const router = require("express").Router();
const userRoutes = require("./api/user");
const commentRoutes = require("./api/comment");
const postRoutes = require("./api/post");

// Book routes
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/post", postRoutes);


module.exports = router;
