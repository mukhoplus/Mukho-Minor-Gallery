const express = require("express");
const router = express.Router();

const mainRouter = require("./mainRouter");
const logoutRouter = require("./logoutRouter");
const signupRouter = require("./signupRouter");
const galleryRouter = require("./galleryRouter");
const postRouter = require("./postRouter");
const writeRouter = require("./writeRouter");

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

module.exports = router;
