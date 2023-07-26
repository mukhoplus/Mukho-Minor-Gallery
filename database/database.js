import { createConnection } from "mysql";
import dbConfig from "../config/dbConfig.js";
import { getCurrentTime } from "../util/util.js";

const connection = createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error(
      `[${getCurrentTime()}] 데이터베이스 연결 과정에서 오류가 발생했습니다.\n${
        err.stack
      }`
    );
    return;
  }

  console.log(
    `[${getCurrentTime()}] 데이터베이스가 연결되었습니다.(${
      connection.threadId
    })`
  );
});

export default connection;
