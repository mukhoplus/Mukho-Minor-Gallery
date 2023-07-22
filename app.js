const express = require("express");
const config = require("./config/config.js");

const serverPort = config.serverPort;
const app = express();

app.get("/", (req, res) => {
    res.send("묵호 마이너 갤러리");
});

app.listen(serverPort, () => {
    console.log(`${serverPort}번 포트에서 서버가 시작되었어요.`);
});
