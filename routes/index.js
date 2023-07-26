import { Router } from "express";
const router = Router();

import mainRouter from "./mainRouter.js";
import logoutRouter from "./logoutRouter.js";
import signupRouter from "./signupRouter.js";
import galleryRouter from "./galleryRouter.js";
import postRouter from "./postRouter.js";
import writeRouter from "./writeRouter.js";

router.get("/", (req, res) => {
  if (req.user) res.redirect("/gallery");
  else res.redirect("/main");
});

router.use("/main", mainRouter);
router.use("/logout", logoutRouter);
router.use("/signup", signupRouter);
router.use("/gallery", galleryRouter);
router.use("/post", postRouter);
router.use("/write", writeRouter);

export default router;
