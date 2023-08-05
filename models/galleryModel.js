import { queryAsync } from "../util/util.js";

const galleryModel = {};

export async function getGalleryData() {
  try {
    const rows = await queryAsync(
      "SELECT p.post_id, title, p.content, user_title, u.nickname, hit, post_date, COUNT(comment_id) AS comment_count FROM post p JOIN user u ON u.user_id = p.writer LEFT JOIN comment c ON c.post_id = p.post_id GROUP BY p.post_id ORDER BY post_id DESC"
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

export default galleryModel;
