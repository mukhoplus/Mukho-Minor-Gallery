const express = require("express");
const router = express.Router();
const util = require("../util/util");

router.get("/", (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    res.redirect("/gallery/1");
  }
});

router.get("/:page", async (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    const page = req.params.page;
    let length = 0;

    // 메인 갤러리 페이지 렌더링
    const rows = await util.queryAsync(
      "SELECT p.post_id, title, p.content, u.nickname, hit, post_date, COUNT(comment_id) AS comment_count FROM post p JOIN user u ON u.user_id = p.writer LEFT JOIN comment c ON c.post_id = p.post_id GROUP BY p.post_id ORDER BY post_id DESC"
    );
    length = rows.length - 1;
    res.render("gallery.ejs", {
      id: req.user.id,
      nickname: req.user.nickname,
      rows: rows,
      page: page,
      length: length,
      page_num: 10,
    });
  }
});

module.exports = router;
