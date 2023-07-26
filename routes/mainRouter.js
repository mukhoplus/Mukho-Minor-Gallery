const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const passport = require("passport");

router.get("/", mainController.getMainPage);

router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/gallery",
    failureRedirect: "/main",
    failureFlash: true,
  })
);

module.exports = router;
