const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("post.ejs");
});

router.post("/", (req, res) => {

});

module.exports = router;
