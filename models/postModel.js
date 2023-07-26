const util = require("../util/util");

const postModel = {};

postModel.getPostById = async (postId) => {
  const rows = await util.queryAsync(
    "SELECT post_id, u.nickname, hit, post_date, title, content, image FROM post p, user u WHERE u.user_id = p.writer AND post_id=?",
    [postId]
  );
  return rows[0] || null;
};

postModel.increasePostHit = async (postId) => {
  await util.queryAsync("UPDATE post SET hit=hit+1 WHERE post_id=?", [postId]);
};

postModel.getCommentsByPostId = async (postId) => {
  const comments = await util.queryAsync(
    "SELECT comment_id, u.nickname, content, comment_date FROM comment c, user u WHERE post_id=? AND u.user_id = c.writer",
    [postId]
  );
  return comments;
};

postModel.deletePostById = async (postId) => {
  await util.queryAsync("DELETE FROM post WHERE post_id=?", [postId]);
};

postModel.createComment = async (content, writer, postId, commentDate) => {
  await util.queryAsync(
    "INSERT INTO comment(content, writer, post_id, comment_date) VALUES(?, ?, ?, ?)",
    [content, writer, postId, commentDate]
  );
};

postModel.deleteCommentById = async (commentId) => {
  await util.queryAsync("DELETE FROM comment WHERE comment_id=?", [commentId]);
};

module.exports = postModel;
