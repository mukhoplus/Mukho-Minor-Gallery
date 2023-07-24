const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack);
        return;
    }
    // console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

let mainRouter = require("./mainRouter");
let logoutRouter = require("./logoutRouter");
let signupRouter = require("./signupRouter");
let galleryRouter = require("./galleryRouter");
let postRouter = require("./postRouter");
let writeRouter = require("./writeRouter");

router.get("/", (req, res) => {
    if (req.user) res.redirect("/gallery"); 
    else res.redirect("/main");
});

router.use("/main", mainRouter);
router.use("/logout", logoutRouter);
router.use("/signup", signupRouter);
router.use("/gallery", galleryRouter);
router.use("/post", postRouter);
router.use("/write", writeRouter);

module.exports = {router, connection};
