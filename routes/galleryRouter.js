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

router.get("/", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else res.redirect("/gallery/1");
});

router.get("/:page", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else {
        const page = req.params.page;
        let length = 0;

        connection.query("SELECT post_id, title, content, u.nickname, hit, post_date FROM post p, user u WHERE u.user_id = p.writer ORDER BY post_id DESC", (err, rows) => {
            if (err) {
                console.error("에러 발생\n" + err.stack);
                res.status(500).send("에러 발생");
            } else {
                length = rows.length - 1;
                res.render("gallery.ejs", {"id": req.user.id, "nickname": req.user.nickname, "rows": rows, "page": page, "length": length, "page_num": 10});
            }
        });

        
    }
});

module.exports = router;
