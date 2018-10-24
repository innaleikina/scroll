const router = require("express").Router();
const userRoutes = require("./api/user");
const commentRoutes = require("./api/comment");
const postRoutes = require("./api/post");
const profileRoutes = require("./api/profile");
const searchRoutes = require("./api/search");
// const authRoutes = require("./api/auth");

// Book routes
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/post", postRoutes);
router.use("/search", searchRoutes);
// router.use("/profile", profileRoutes);
// router.use("/auth", authRoutes);

module.exports = router;
