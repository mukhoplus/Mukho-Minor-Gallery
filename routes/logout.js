const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else {
        req.logout();
        req.session.save(() => {
            res.redirect("/main");
        })
    }
});

module.exports = router;
