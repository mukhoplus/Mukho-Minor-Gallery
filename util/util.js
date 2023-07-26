import dbConnection from "../database/database.js";

export const queryAsync = (query, params) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
