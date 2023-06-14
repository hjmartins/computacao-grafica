const mysql = require("mysql");

class MySqlHandler {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "12345",
      database: "aulas",
    });
  }

  getAllData(callback) {
    const sql = "SELECT * FROM world2023";
    this.connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  makeSearch(callback) {
    const sql = "SELECT * FROM world2023";
    this.connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
}

module.exports = MySqlHandler;
