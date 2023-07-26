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
import { getCurrentTime } from "../util/util.js";

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

        console.log(
          `[${getCurrentTime()}] ${req.user.id}(${
            req.user.nickname
          })이(가) ${postId}번 게시글을 조회했습니다.`
        );

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
      console.log(
        `[${getCurrentTime()}] ${req.user.id}(${req.user.nickname})의 ${
          req.params.post_id
        }번 게시글 조회 과정에서 오류가 발생했습니다. ${err}`
      );
      res.redirect("/gallery");
    }
  }
};

postController.deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;
    await deletePostById(postId);
    console.log(
      `[${getCurrentTime()}] ${req.user.id}(${
        req.user.nickname
      })이(가) ${postId}번 게시글을 삭제했습니다.`
    );
    res.redirect("/gallery");
  } catch (err) {
    console.log(
      `[${getCurrentTime()}] ${req.user.id}(${req.user.nickname})의 ${
        req.params.post_id
      }번 게시글 삭제 과정에서 오류가 발생했습니다. ${err}`
    );
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
    console.log(
      `[${getCurrentTime()}] ${req.user.id}(${
        req.user.nickname
      })이(가) ${postId}번 게시글에 댓글을 작성했습니다.`
    );
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(
      `[${getCurrentTime()}] ${req.user.id}(${req.user.nickname})의 ${
        req.params.post_id
      }번 게시글 댓글 작성 과정에서 오류가 발생했습니다. ${err}`
    );
    res.redirect(`/post/${req.params.post_id}`);
  }
};

postController.deleteComment = async (req, res) => {
  try {
    const commentId = req.body.comment_id;
    const postId = req.params.post_id;
    await deleteCommentById(commentId);
    console.log(
      `[${getCurrentTime()}] ${req.user.id}(${
        req.user.nickname
      })이(가) ${postId}번 게시글에서 댓글을 삭제했습니다.`
    );
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(
      `[${getCurrentTime()}] ${req.user.id}(${req.user.nickname})의 ${
        req.params.post_id
      }번 게시글 댓글 삭제 과정에서 오류가 발생했습니다. ${err}`
    );
    res.redirect(`/post/${req.params.post_id}`);
  }
};

export default postController;
