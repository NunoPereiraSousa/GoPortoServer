const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const saltRounds = 10;

function logUser(req, res) {
    let input = req.body.input
    let password = req.body.password
    let passwordSame = false

    const query = `SELECT * from user where user.username = ? or user.email = ?`
    con.query(query, [input, input], function (err,
        result) {
        if (!err) {
            let message = "success"
            if (result.length == 0) {
                message = "Incorrect data"
            } else {
                passwordSame = bcrypt.compareSync(password, result[0].password) // confirms if the hashed password = to the password that has been introduced
                if (passwordSame == false) {
                    result = []
                    message = "Incorrect data"
                    console.log("PasswordFail"); // Just For tests

                } else if (result[0].password == password && result[0].block !== 0) {
                    result = []
                    message = "Incorrect data"
                    console.log("User is Blocked/Deleted"); //Just For tests
                }
            }

            if (result.length > 0) {
                // console.log(result[0].id_tp2_user)
                const token = jwt.sign({
                    id: result[0].id_tp2_user
                }, config.secret)
                res.status(200).send({
                    token: token,
                    response: result
                })
            } else {
                res.status(404).send(message)
                console.log(message);

            }

            let QResult = [{
                result: result,
                error: error,
                message: message
            }]
            res.send(QResult)
        } else {
            let message = "Error while performing Query."
            console.log('Error while performing Query.', err);
            res.status(500).send(message)
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