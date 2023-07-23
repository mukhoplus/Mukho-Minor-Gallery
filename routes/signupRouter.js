const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("../app.js");

router.get("/", (req, res) => {
    let msg;
    let errMsg = req.flash("error");
    if (errMsg) msg = errMsg;
    res.render("signup.ejs", {"message": msg});
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

passport.use("local-signup", new LocalStrategy({
        usernameField: "id",
        passwordField: "password",
        passwordConfirmField: "passwordConfirm",
        nicknameField: "nickname",
        passReqToCallback: true
    }, function (req, id, password, done) {
        try {
            // 아이디 중복 확인
            connection.query("SELECT * FROM user WHERE id=?", [id], (err, rows) => {
                if (err) return done(err);
                if (rows.length) return done(null, false, {message: "중복된 ID입니다."});
            
                // 비밀번호 확인
                const passwordConfirm = req.body.passwordConfirm;
                if (password !== passwordConfirm) return done(null, false, {message: "비밀번호가 일치하지 않습니다."});
                
                // 닉네임 중복 확인
                const nickname = req.body.nickname;
                connection.query("SELECT * FROM user WHERE nickname=?", [nickname], (err, rows) =>{
                    if (err) return done(err);
                    if (rows.length) return done(null, false, {message: "중복된 닉네임입니다."});
                
                    // 회원가입
                    const userInfo = {id: id, password: password, nickname: nickname};
                    connection.query("INSERT INTO user SET ?", userInfo, (err, rows) => {
                        if (err) return done(err);
                        return done(null, userInfo);
                    });
                });
            });
        } catch (err) {
            return done(err);
        }
    })
);

router.post("/", passport.authenticate("local-signup", {
    successRedirect: "/gallery",
    failureRedirect: "/signup",
    failureFlash: true
}), (err) => {
    console.log(err);
});

module.exports = router;
