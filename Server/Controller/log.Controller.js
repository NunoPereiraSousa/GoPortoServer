const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const saltRounds = 10;
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function logUser(req, res) {
    let input = req.sanitize(req.body.input)
    let password = req.sanitize(req.body.password)
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


                } else if (passwordSame && result[0].block == 2) {
                    result = []
                    message = "Incorrect data"
                }
            }
            if (result.length > 0) {

                const token = jwt.sign({
                    id: result[0].id_user
                }, config.secret)
                res.status(200).send({
                    token: token,
                    response: result
                })
            } else {
                res.status(404).send(message)
            }
        } else {
            let message = "Error while performing Query."
            console.log('Error while performing Query.', err);
            res.status(500).send(message)
        }
    });
}

function signUpUser(req, res) {
    let name = req.sanitize(req.body.name);
    let username = req.sanitize(req.body.username);
    let password = req.sanitize(req.body.password);
    let email = req.sanitize(req.body.email);
    let message = "success"
    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO user (id_user_type, block, name, username, password,email) VALUES ('2', '0', '${name}', '${username}', '${hash}', '${email}')`, (queryErr, result) => {

                if (!queryErr) {
                    message = "User created with success"
                    res.status(201).send(message);
                } else {
                    message = "Existent File"
                    res.status(400).send(queryErr);
                    // hustle
                }
            })
        } else {
            message = "Something went wrong, please try again."
            res.status(500).send(message)
        }
    });
}
module.exports = {
    logUser,
    signUpUser
}