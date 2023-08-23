import express from "express";
import { createServer } from "http";
import { createServer as createServer_ } from "https";
import bodyParser from "body-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import fs from "fs";

import router from "./routes/index.js";
import appConfig from "./config/appConfig.js";
import sessionConfig from "./config/sessionConfig.js";
import { initializePassport } from "./config/passportConfig.js";
import { getCurrentTime } from "./util/util.js";

const { session: _session } = passport;
const { json, urlencoded } = bodyParser;

const version = "1.1.3";
const httpsOptions = {
  key: fs.readFileSync("./rootca.key"),
  cert: fs.readFileSync("./rootca.crt")
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const httpsServer = createServer_(httpsOptions, app);

app.use(express.static(join(__dirname, "")));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

const userSession = session(sessionConfig);
initializePassport();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(userSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);

httpServer.listen(appConfig.port, () => {
  console.log(
    `묵호 마이너 갤러리(Ver ${version})\n[${getCurrentTime()}] ${
      appConfig.port
    }번 포트에서 서버가 시작되었어요.`
  );
});

httpsServer.listen(appConfig.httpsPort, () => {
  console.log(`[${getCurrentTime()}] ${
      appConfig.httpsPort
    }번 포트에서 보안 서버가 시작되었어요.`
  );
});
