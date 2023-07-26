const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const cookieParser = require("cookie-parser");
const util = require("../util/util");

router.use(cookieParser());

router.get("/:post_id", async (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    const postId = req.params.post_id;
    // 예외 처리
    const rows = await util.queryAsync(
      "SELECT post_id, u.nickname, hit, post_date, title, content, image FROM post p, user u WHERE u.user_id = p.writer AND post_id=?",
      [postId]
    );

    if (rows.length === 0) {
      res.redirect("/gallery");
    } else {
      const localCookies = req.cookies;

      if (!localCookies || localCookies[postId] !== "true") {
        // 조회수 증가
        await util.queryAsync("UPDATE post SET hit=hit+1 WHERE post_id=?", [
          postId,
        ]);
        ++rows[0].hit;
        res.cookie(postId, "true", { maxAge: 60 * 60 * 1000 });
      }

      const title = rows[0].title;
      const comments = await util.queryAsync(
        "SELECT comment_id, u.nickname, content, comment_date FROM comment c, user u WHERE post_id=? AND u.user_id = c.writer",
        [postId]
      );

      res.render("post.ejs", {
        id: req.user.id,
        nickname: req.user.nickname,
        row: rows[0],
        comments: comments,
        comment_length: comments.length,
        title: title,
        post_id: postId,
      });
    }
  }
});

router.post("/delete/:post_id", async (req, res) => {
  const postId = req.params.post_id;
  await util.queryAsync("DELETE FROM post WHERE post_id=?", [postId]);
  res.redirect("/gallery");
});

router.post("/:post_id/comment", async (req, res) => {
  const content = req.body.comment;
  const writer = req.user.userId;
  const postId = req.params.post_id;
  const commentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");

  await util.queryAsync(
    "INSERT INTO comment(content, writer, post_id, comment_date) VALUES(?, ?, ?, ?)",
    [content, writer, postId, commentDate]
  );
  res.redirect(`/post/${postId}`);
});

router.post("/:post_id/comment/delete", async (req, res) => {
  const commentId = req.body.comment_id;
  const postId = req.params.post_id;
  await util.queryAsync("DELETE FROM comment WHERE comment_id=?", [commentId]);
  res.redirect(`/post/${postId}`);
});

module.exports = router;
