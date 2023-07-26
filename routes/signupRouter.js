const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const passport = require("passport");

router.get("/", signupController.getSignupPage);

router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/gallery",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
