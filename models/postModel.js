import { queryAsync } from "../util/util.js";

const postModel = {};

export async function getPostById(postId) {
  const rows = await queryAsync(
    "SELECT post_id, u.nickname, hit, post_date, title, content, image FROM post p, user u WHERE u.user_id = p.writer AND post_id=?",
    [postId]
  );
  return rows[0] || null;
}

export async function increasePostHit(postId) {
  await queryAsync("UPDATE post SET hit=hit+1 WHERE post_id=?", [postId]);
}

export async function getCommentsByPostId(postId) {
  const comments = await queryAsync(
    "SELECT comment_id, u.nickname, content, comment_date FROM comment c, user u WHERE post_id=? AND u.user_id = c.writer",
    [postId]
  );
  return comments;
}

export async function deletePostById(postId) {
  await queryAsync("DELETE FROM post WHERE post_id=?", [postId]);
}

export async function createComment(content, writer, postId, commentDate) {
  await queryAsync(
    "INSERT INTO comment(content, writer, post_id, comment_date) VALUES(?, ?, ?, ?)",
    [content, writer, postId, commentDate]
  );
}

export async function deleteCommentById(commentId) {
  await queryAsync("DELETE FROM comment WHERE comment_id=?", [commentId]);
}

export default postModel;
