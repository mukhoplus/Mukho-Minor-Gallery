const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/gallery");
  } else {
    const msg = req.flash("error")[0] || null;
    res.render("main.ejs", { message: msg });
  }
});

router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/gallery",
    failureRedirect: "/main",
    failureFlash: true,
  })
);

module.exports = router;
