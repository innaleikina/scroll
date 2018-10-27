const router = require("express").Router();
const postController = require("../../controllers/postController");


router.route("/all")
  .get(postController.findAll);

router.route("/following/:followingID")  
  .get(postController.getFollowing)

router.route("/:id")
// This route uses the post id
  .post(postController.create)
  // This route uses the user id
  .get(postController.findById)
  // !!!!This route uses the POST id!!!!!!
  .put(postController.update)
  .delete(postController.remove);

  router.route("/add/:id")
// This route uses the user id
  .post(postController.create)

  router
  .route("/search/:search")
  .get(postController.findBySearch)
  
module.exports = router;