import { Router } from "express";
const router = Router();
import writeController from "../controllers/writeController.js";
import multer, { diskStorage } from "multer";
import { extname } from "path";

// 파일 업로드 설정
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", writeController.renderWritePage);
router.post("/", upload.single("image"), writeController.createPost);

export default router;
