const dbConnection = require("../database/database");

module.exports = {
  queryAsync: function (query, params) {
    return new Promise((resolve, reject) => {
      dbConnection.query(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};
