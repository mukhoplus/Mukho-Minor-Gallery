const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else res.render("gallery.ejs", {"id": req.user.id, "nickname": req.user.nickname});
});

module.exports = router;
