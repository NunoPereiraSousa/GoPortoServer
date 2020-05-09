const mysql = require('mysql');

const con = mysql.createConnection({
    host: "remotemysql.com",
    port: "3306",
    user: "D3c9hRhknT",
    password: "YAAey6q6Ws",
    database: "D3c9hRhknT"
});

module.exports = con;