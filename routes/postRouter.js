import { Router } from "express";
const router = Router();
import postController from "../controllers/postController.js";
import cookieParser from "cookie-parser";

router.use(cookieParser());

router.get("/:post_id", postController.renderPostPage);
router.post("/delete/:post_id", postController.deletePost);
router.post("/:post_id/comment", postController.createComment);
router.post("/:post_id/comment/delete", postController.deleteComment);

export default router;
