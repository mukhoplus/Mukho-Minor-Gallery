const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else {
        const id = req.user.id;
        const nickname = req.user.nickname;

        req.logout((err) => {
            if (err) console.log("로그아웃 중 오류가 발생했어요.");
            req.session.save(() => {
                console.log(`Passport 세션이 제거되었어요: ${id}(${nickname})`);
                res.redirect("/main");
            });
        })
    }
});

module.exports = router;
