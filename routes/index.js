const express = require("express");
const router = express.Router();

let mainRouter = require("./mainRouter");
let signupRouter = require("./signupRouter");
let galleryRouter = require("./galleryRouter");
let postRouter = require("./postRouter");

router.get("/", (req, res) => {
    res.redirect("/main");
});

router.use("/main", mainRouter);
router.use("/signup", signupRouter);
router.use("/gallery", galleryRouter);
router.use("/post", postRouter);

module.exports = router;
