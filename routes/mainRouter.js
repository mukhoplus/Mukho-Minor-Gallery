const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const dbConfig = require("../config/dbConfig.js");
const encryptionConfig = require("../config/encryptionConfig.js");

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack);
        return;
    }
    // console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

router.get("/", (req, res) => {
    if (req.user) res.redirect("/gallery"); 
    else {
        let msg;
        let errMsg = req.flash("error");
        if (errMsg) msg = errMsg;
        res.render("main.ejs", {"message": msg});
    }
});

passport.serializeUser((user, done) => {
    console.log(`Passport 세션이 저장되었어요: ${user.id}(${user.nickname})`);
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    const id = user.id;
    const nickname = user.nickname;

    try {
        const row = await queryAsync("SELECT user_id FROM user WHERE id=?", [id]);
        user.user_id = row[0].user_id;
    } catch (err) {
        return done(err);
    }
    const user_id = user.user_id;
    done(null, {"user_id": user_id, "id": id, "nickname": nickname});
});

passport.use("local-login", new LocalStrategy({
        usernameField: "id",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, id, password, done) {
        try {
            connection.query("SELECT id FROM user WHERE id=?", [id], (err, rows) => {
                if (err) return done(err);
                if (!rows.length) return done(null, false, {message: "아이디 또는 비밀번호가 틀렸습니다."}
            );

                let dbPassword;
                connection.query("SELECT * FROM user WHERE id=?", [id, password], (err, rows) => {
                    if (err) return done(err);
                    dbPassword = rows[0].password;
                    
                    bcrypt.compare(password, dbPassword, (err, result) => {
                        if (err) return done(err);
                        if (!result) return done(null, false, {message: "아이디 또는 비밀번호가 틀렸습니다."});
                        
                        const nickname = rows[0].nickname;
                        return done(null, {"userId": rows[0].user_id, "id": id, "nickname": nickname});
                    });
                });
            }); 
        } catch (err) {
            return done(err);
        }
    })
);

router.post("/", passport.authenticate("local-login", {
        successRedirect: "/gallery",
        failureRedirect: "/main",
        failureFlash: true
    }), (err) => {
    console.log(err);
});

function queryAsync(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = router;
