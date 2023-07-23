const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");
const mysql = require("mysql");

const router = require("./routes/index");
const appConfig = require("./config/appConfig.js");
const sessionConfig = require("./config/sessionConfig.js");
const dbConfig = require("./config/dbConfig.js");

const app = express();
const server = http.createServer(app);
const userSession = session(sessionConfig);
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack);
        return;
    }
    console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: true}));
app.use(userSession);
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());
app.use(router);

server.listen(appConfig.port, () => {
    console.log(`${appConfig.port}번 포트에서 서버가 시작되었어요.`);
});

module.exports = connection;
