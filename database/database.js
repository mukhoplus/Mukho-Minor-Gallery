import { createConnection } from "mysql";
import dbConfig from "../config/dbConfig.js";
import { getCurrentTime } from "../util/util.js";

const connection = createConnection(dbConfig);

function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error(
        `[${getCurrentTime()}] 데이터베이스 연결 과정에서 오류가 발생했습니다.\n${
          err.stack
        }`
      );
      return;
    }
  
    connection.on("error", (err) => {
      if(err.code === "PROTOCOL_CONNECTION_LOST") {
        return handleDisconnect();
      } else {
        throw err;
      }
    });

    console.log(
      `[${getCurrentTime()}] 데이터베이스가 연결되었습니다.(${
        connection.threadId
      })`
    );
  });
}

// Packets out of order. 오류 해결을 위한 주기적인 쿼리 전송
function executeSelectQuery() {
  connection.query("SELECT 1", (err) => {
    if (err) {
      console.error(
        `[${getCurrentTime()}] 주기적 쿼리 전송 과정에서 오류가 발생했습니다.\n${
          err.stack
        }`
      );
      return;
    }
  });
}

handleDisconnect();
setInterval(executeSelectQuery, 30 * 60 * 1000);

export default connection;
