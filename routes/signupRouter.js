const express = require("express");
const router = express.Router();
const passport = require("passport");

// 회원가입 페이지 라우트
router.get("/", (req, res) => {
  const msg = req.flash("error")[0] || null;
  res.render("signup.ejs", { message: msg });
});

router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/gallery",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

module.exports = router;
