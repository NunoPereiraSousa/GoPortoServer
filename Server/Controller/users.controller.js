const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getUsers(req, res) {
    con.query(`SELECT * FROM user`, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addUsers(req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.sanitize(req.body.password);
    
    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO user (id_user_type, block, name, username, password) VALUES ('1', '0', '${name}', '${username}', '${hash}')`, (queryErr, result) => {
                if (!queryErr) {
                    console.log("User inserted");
                    return res.send(result);
                } else {
                    return res.status(400).send({
                        "error": queryErr
                    });
                }
            })
        } else {
            console.log(err);
        }
    });
}

function getUserByID(req, res) {
    let id_user = req.params.id;
    
    con.query("SELECT * FROM user WHERE id_user = ?", id_user, function (err,
        result) {
        if (!err) {
            return res.json(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}

function updateUser(req, res) {
    let id_user = req.params.id;
    let username = req.body.username;

    con.query("UPDATE user SET username = ? WHERE id_user = ?", [username, id_user], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}

function deleteUser(req, res) {
    let id_user = req.params.id;
    con.query("UPDATE user SET block = 2 WHERE id_user = ?", id_user, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser
}