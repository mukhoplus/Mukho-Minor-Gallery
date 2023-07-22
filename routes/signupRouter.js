const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // 로그인

    // 비로그인
    res.render("signup.ejs");
});

module.exports = router;
