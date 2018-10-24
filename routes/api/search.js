const router = require("express").Router();
const postController = require("../../controllers/postController");
const userController = require("../../controllers/userController");


router.route("/:search")
//find user 
.get(userController.findBySearch)

// //find post 
// .get(postController.findBySearch)

module.exports = router;