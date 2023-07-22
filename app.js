const express = require("express");
const http = require("http");
const mysql = require("mysql");
const path = require("path");
const router = require("./routes/index");
const appConfig = require("./config/appConfig.js");
const dbConfig = require("./config/dbConfig.js");

const app = express();
const server = http.createServer(app);
const connection = mysql.createConnection(dbConfig);

app.use("/", router);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
connection.connect((err) => {
    if (err) {
        console.error("데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack);
        return;
    }
    console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

server.listen(appConfig.port, () => {
    console.log(`${appConfig.port}번 포트에서 서버가 시작되었어요.`);
});
