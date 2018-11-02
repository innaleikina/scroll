const router = require("express").Router();
const commentController = require("../../controllers/commentController");


router.route("/all")
  .get(commentController.findAll);


router.route("/:id/:userid")

  .post(commentController.create)

  .get(commentController.findById)
  // !!!!This route uses the COMMENT id!!!!!!
  router.route("/:id")
  .put(commentController.update)
  .delete(commentController.remove);

module.exports = router;