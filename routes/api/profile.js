const router = require("express").Router();
const postController = require("../../controllers/postController");
const userController = require("../../controllers/userController");

//uses the user id to find the user's information and all posts 
router.route("/:id")
.get(userController.findById)
.get(postController.findById)

module.exports = router;