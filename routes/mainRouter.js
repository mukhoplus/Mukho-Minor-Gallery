const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../app.js");

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

passport.deserializeUser((user, done) => {
    const id = user.id;
    const nickname = user.nickname;
    done(null, {"id": id, "nickname": nickname});
});

passport.use("local-login", new LocalStrategy({
        usernameField: "id",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, id, password, done) {
        try {
            connection.query("SELECT * FROM user WHERE id=? AND password=?", [id, password], (err, rows) => {
                if (err) return done(err);
                if (!rows.length) return done(null, false, {message: "아이디 또는 비밀번호가 틀렸습니다."});
                
                const nickname = rows[0].nickname;
                return done(null, {"userId": rows[0].user_id, "id": id, "nickname": nickname});
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

module.exports = router;
