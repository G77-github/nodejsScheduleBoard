const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    password: "qooqqng12",
    database: "webpagecontent"
});

db.connect();

module.exports = db;
