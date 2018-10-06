const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/all")
  .get(postController.findAll);

// Matches with "/api/books/:id"
router.route("/:id")
  .post(postController.create)
  .get(postController.findById)
  .put(postController.update)
  .delete(postController.remove);

module.exports = router;