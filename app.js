const express = require("express");
const mysql = require("mysql");
const appConfig = require("./config/appConfig.js");
const dbConfig = require("./config/dbConfig.js");

const app = express();
const connection = mysql.createConnection(dbConfig);

app.get("/", (req, res) => {
    res.send("묵호 마이너 갤러리");
});

app.listen(appConfig.serverPort, () => {
    console.log(`${appConfig.serverPort}번 포트에서 서버가 시작되었어요.`);
});
