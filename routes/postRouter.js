const express = require("express");
const router = express.Router();
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

router.get("/:post_id", (req, res) => {
    if (!req.user) res.redirect("/main"); 
    else {
        connection.query("UPDATE post SET hit=hit+1 WHERE post_id=?", [req.params.post_id], (err, rows) => {
            if (err) {
                console.error("에러 발생\n" + err.stack);
                res.status(500).send("에러 발생");
            } else {
                connection.query("SELECT post_id, u.nickname, hit, post_date, title, content, image FROM post p, user u WHERE u.user_id = p.writer AND post_id=?", [req.params.post_id], (err, rows) => {
                    if (err) {
                        console.error("에러 발생\n" + err.stack);
                        res.status(500).send("에러 발생");
                    } else {
                        const title = rows[0].title;

                        connection.query("SELECT comment_id, u.nickname, content, comment_date FROM comment c, user u WHERE post_id=? AND u.user_id = c.writer", [req.params.post_id], (err, com) => {
                            if (err) {
                                console.error("에러 발생\n" + err.stack);
                                res.status(500).send("에러 발생");
                            } else {
                                res.render("post.ejs", {
                                    "id": req.user.id,
                                    "nickname": req.user.nickname,
                                    "row": rows[0],
                                    "comment": com,
                                    "comment_length": com.length,
                                    "title": title,
                                    "post_id": req.params.post_id
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/delete/:post_id", (req, res) => {
   const post_id = req.params.post_id;
    connection.query("DELETE FROM post WHERE post_id=?", [post_id], (err, rows) => {
        if (err) {
            console.error("에러 발생\n" + err.stack);
            res.status(500).send("에러 발생");
        } else {
            res.redirect("/gallery");
        }
    });
});

router.post("/:post_id/comment", (req, res) => {
    const content = req.body.comment;
    const writer = req.user.user_id;
    const post_id = req.params.post_id;
    const comment_date = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");

    connection.query("INSERT INTO comment(content, writer, post_id, comment_date) VALUES(?, ?, ?, ?)", [content, writer, post_id, comment_date], (err, rows) => {
        if (err) {
            console.error("에러 발생\n" + err.stack);
            res.status(500).send("에러 발생");
        } else {
            res.redirect(`/post/${post_id}`);
        }
    });
});

module.exports = router;
