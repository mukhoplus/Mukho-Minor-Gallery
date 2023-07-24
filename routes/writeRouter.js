const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const upload = multer({dest: "uploads/"});
const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");
const moment = require("moment-timezone");

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack);
        return;
    }
    // console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else res.render("write.ejs");
});

router.post("/", upload.single("image"), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.user.user_id;
    const post_date = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");

    let imageFilePath = null;
    if(req.file) {
        const image = req.file;
        imageFilePath = path.join('uploads/', image.filename);
    }

    connection.query("INSERT INTO post(title, content, writer, image, post_date) VALUES(?, ?, ?, ?, ?)", [title, content, writer, imageFilePath,post_date], (err, rows) => {
        if (err) {
            console.error("에러 발생\n" + err.stack);
            res.status(500).send("에러 발생");
        } else {
            res.redirect("/gallery");
        }
    });
});

module.exports = router;
