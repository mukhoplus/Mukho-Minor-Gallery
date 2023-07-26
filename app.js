const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const router = require("./routes/index");
const appConfig = require("./config/appConfig.js");
const sessionConfig = require("./config/sessionConfig.js");
const initializePassport = require("./config/passportConfig");

const app = express();
const server = http.createServer(app);
const userSession = session(sessionConfig);
initializePassport(passport);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userSession);
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

server.listen(appConfig.port, () => {
  console.log(
    `묵호 마이너 갤러리(Ver 0.4.0)\n${appConfig.port}번 포트에서 서버가 시작되었어요.`
  );
});
