const express = require("express");
const router = express.Router();
const connection = require("../app.js");

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else res.render("write.ejs");
});

router.post("/", (req, res) => {

});

module.exports = router;
