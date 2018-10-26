const router = require("express").Router();
const userRoutes = require("./api/user");
const commentRoutes = require("./api/comment");
const postRoutes = require("./api/post");
const profileRoutes = require("./api/profile");


// Book routes
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/post", postRoutes);
// router.use("/profile", profileRoutes);

module.exports = router;
