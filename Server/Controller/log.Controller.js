const bcrypt = require('bcrypt');
const con = require("../Database/database")
const saltRounds = 10;

function logUser(req, res) {

    let input = req.body.input
    let password = req.body.password


    const query = `SELECT * from user where user.username = ? or user.email = ?`
    con.query(query, [input, input], function (err,
        result) {
        if (!err) {
            let message = "success"
            let error = null

            if (result.length == 0) {
                message = "Incorrect data"
            } else {
                if (result[0].password != password) {
                    result = []
                    message = "Incorrect data"
                    console.log("PasswordFail"); // Just For tests

                } else if (result[0].password == password && result[0].block !== 0) {
                    result = []
                    message = "Incorrect data"
                    console.log("User is Blocked/Deleted"); //Just For tests
                }
            }

            let QResult = [{
                result: result,
                error: error,
                message: message
            }]
            res.send(QResult)
        } else {
            console.log('Error while performing Query.', err);
        }
    });
}
function signUpUser(req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.sanitize(req.body.password);
    let email = req.body.email;

    let error = null
    let message = "success"
    let QResult = []


    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO user (id_user_type, block, name, username, password,email) VALUES ('1', '0', '${name}', '${username}', '${hash}', '${email}')`, (queryErr, result) => {

                if (!queryErr) {
                    console.log("User inserted");
                    QResult = [{
                        result: result,
                        error: queryErr,
                        message: message
                    }]
                    res.send(QResult);
                } else {
                    message = "Existent File"
                    QResult = [{
                        result: [],
                        error: queryErr,
                        message: message
                    }]
                    return res.status(400).send(QResult);
                }
            })
        } else {
            console.log(err);
        }
    });


}

module.exports = {
    logUser,
    signUpUser
}
