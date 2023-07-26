const express = require("express");
const router = express.Router();
const writeController = require("../controllers/writeController");
const multer = require("multer");
const path = require("path");

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

router.get("/", writeController.renderWritePage);
router.post("/", upload.single("image"), writeController.createPost);

module.exports = router;
