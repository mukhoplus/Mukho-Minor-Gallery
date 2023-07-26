const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error(
      "데이터베이스 연결 과정에서 오류가 발생했습니다.\n" + err.stack
    );
    return;
  }
  
  console.log(`데이터베이스가 연결되었습니다.(${connection.threadId})`);
});

module.exports = connection;
