const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const moment = require("moment-timezone");
const util = require("../util/util");

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  if (!req.user) {
    res.redirect("/main");
  } else {
    res.render("write.ejs", { id: req.user.id, nickname: req.user.nickname });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const writer = req.user.userId;
  const postDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  let image = null;

  if (req.file) {
    image = req.file.filename;
  }

  const postInfo = {
    title: title,
    content: content,
    writer: writer,
    post_date: postDate,
    image: image,
  };
  await util.queryAsync("INSERT INTO post SET ?", postInfo);
  res.redirect("/gallery");
});

module.exports = router;
