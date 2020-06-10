const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: "remotemysql.com",
//     port: "3306",
//     user: "D3c9hRhknT",
//     password: "YAAey6q6Ws",
//     database: "D3c9hRhknT"
// });

let con;

function handleDisconnect() {
    con = mysql.createConnection({
        host: "remotemysql.com",
        port: "3306",
        user: "D3c9hRhknT",
        password: "YAAey6q6Ws",
        database: "D3c9hRhknT"
    }); // Recreate the connection, since
    // the old one cannot be reused.

    con.connect(function (err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    con.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            handleDisconnect() //!!!!!!!!!!!!!!!!!!!!!!!!
            throw err; // server variable configures this)
        }
    });
}

handleDisconnect();

module.exports = con;