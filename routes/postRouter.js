const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/:post_id", postController.renderPostPage);
router.post("/delete/:post_id", postController.deletePost);
router.post("/:post_id/comment", postController.createComment);
router.post("/:post_id/comment/delete", postController.deleteComment);

module.exports = router;
