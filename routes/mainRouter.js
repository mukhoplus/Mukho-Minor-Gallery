const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // 로그인 상태
    // res.redirect("gallery");

    // 비로그인 상태
    res.render("main");
});

router.post("/", (req, res) => {
    // 로그인 로직
});

module.exports = router;
