import { type } from "os";
import moment from "moment-timezone";
import {
  getPostById,
  increasePostHit,
  getCommentsByPostId,
  deletePostById,
  createComment,
  deleteCommentById,
} from "../models/postModel.js";

const postController = {};

postController.renderPostPage = async (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    try {
      const postId = req.params.post_id;
      const post = await getPostById(postId);

      if (!post) {
        res.redirect("/gallery");
      } else {
        const localCookies = req.cookies;

        // 조회수 증가
        if (!localCookies || localCookies[postId] !== "true") {
          await increasePostHit(postId);
          ++post.hit;
          res.cookie(postId, "true", { maxAge: 60 * 60 * 1000 });
        }

        const comments = await getCommentsByPostId(postId);

        res.render("post.ejs", {
          os_type: type(),
          id: req.user.id,
          nickname: req.user.nickname,
          row: post,
          comments: comments,
          comment_length: comments.length,
          title: post.title,
          post_id: postId,
        });
      }
    } catch (err) {
      console.error("Error rendering post page:", err);
      res.redirect("/gallery");
    }
  }
};

postController.deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;
    await deletePostById(postId);
    res.redirect("/gallery");
  } catch (err) {
    console.error("Error deleting post:", err);
    res.redirect("/gallery");
  }
};

postController.createComment = async (req, res) => {
  try {
    const content = req.body.comment;
    const writer = req.user.userId;
    const postId = req.params.post_id;
    const commentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");

    await createComment(content, writer, postId, commentDate);
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.redirect(`/post/${postId}`);
  }
};

postController.deleteComment = async (req, res) => {
  try {
    const commentId = req.body.comment_id;
    const postId = req.params.post_id;
    await deleteCommentById(commentId);
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.redirect(`/post/${postId}`);
  }
};

export default postController;
