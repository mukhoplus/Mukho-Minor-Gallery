import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import appConfig from "./config/appConfig.js";
import sessionConfig from "./config/sessionConfig.js";
import { initializePassport } from "./config/passportConfig.js";
import { getCurrentTime } from "./util/util.js";

const { session: _session } = passport;
const { json, urlencoded } = bodyParser;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

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

server.listen(appConfig.port, () => {
  console.log(
    `묵호 마이너 갤러리(Ver 1.1.1)\n[${getCurrentTime()}] ${
      appConfig.port
    }번 포트에서 서버가 시작되었어요.`
  );
});
