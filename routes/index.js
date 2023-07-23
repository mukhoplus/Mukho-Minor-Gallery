const express = require("express");
const router = express.Router();

let mainRouter = require("./mainRouter");
let logoutRouter = require("./logoutRouter");
let signupRouter = require("./signupRouter");
let galleryRouter = require("./galleryRouter");
let postRouter = require("./postRouter");
let writeRouter = require("./writeRouter");

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
