const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getUsers(req, res) {
    let message = null
    con.query(`SELECT * FROM user WHERE block != 2`, (queryErr, result) => {
        if (!queryErr) {


            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                let message = "Nothing to show"
                res.status(400).send(message);
            }

        } else {
            message = "Error while performing Query."
            res.status(500).send("Error while performing Query.")
        }
    })
}

function addUsers(req, res) {
    let id_user_type = req.sanitize(req.body.id_user_type);
    let name = req.sanitize(req.body.name);
    let username = req.sanitize(req.body.username);
    let password = req.sanitize(req.body.password);
    let email = req.sanitize(req.body.email);
    let message = null

    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO user (id_user_type, block, name, username, password,email) VALUES ('${id_user_type}', '0', '${name}', '${username}', '${hash}','${email}')`, (queryErr, result) => {
                if (!queryErr) {
                    message = "User created with success"
                    res.status(201).send(result);
                } else {
                    message = "Something went wrong"
                    res.status(400).send(message);
                }
            })
        } else {
            message = "Something went wrong, please try again."
            res.status(500).send(message)
            console.log(queryErr);

        }
    });
}

// 
function getUserByID(req, res) {
    let id_user = req.sanitize(req.params.id);

    con.query("SELECT * FROM user WHERE id_user = ?", id_user, function (err,
        result) {
        if (!err) {
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(400).send("Nothing to show")
            }
        } else {
            console.log('Error while performing Query.', err);
            res.status(500).send("Error while performing Query.")
        }

    });
}

function updateUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    let id_user_type = req.sanitize(req.body.id_user_type);
    let name = req.sanitize(req.body.name);
    let username = req.sanitize(req.body.username);
    let password = req.sanitize(req.body.password);
    let email = req.sanitize(req.body.email);
    let photo = req.sanitize(req.body.photo);
    let location = req.sanitize(req.body.location);
    let birth = req.sanitize(req.body.birth);
    let message = null

    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`UPDATE user SET id_user_type = ?, name = ?, username = ?, password = ?, email = ?, photo = ?, location = ?, birth = ? WHERE id_user = ?`,
                [id_user_type, name, username, hash, email, photo, location, birth, id_user], (queryErr, result) => {
                    if (!queryErr) {
                        message = "User edited with success"
                        res.status(200).send(result);
                    } else {
                        console.log(queryErr);

                    }
                })
        } else {
            message = "Something went wrong, please try again."
            res.status(500).send(message)
        }
    });
}






// Todo
function updateProfile(req, res) {
    let id_user = req.sanitize(req.params.id);
    let name = req.sanitize(req.body.name);
    let email = req.sanitize(req.body.email);
    let photo = req.sanitize(req.body.photo);
    let location = req.sanitize(req.body.location);
    let birth = req.sanitize(req.body.birth);

    con.query(`UPDATE user SET name = ?, email = ?, photo = ?, location = ?, birth = ? WHERE id_user = ?`,
        [name, email, photo, location, birth, id_user], (queryErr, result) => {
            if (!queryErr) {
                message = "User edited with success"
                res.status(200).send(result);
            } else {
                res.status(500).send(queryErr)
            }
        })
}
// Todo 






function blockUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    let block = req.sanitize(req.body.block);

    con.query("UPDATE user SET block = ? WHERE id_user = ?", [block, id_user], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(400).send(err);
        }
    });
}

function deleteUser(req, res) {
    let id_user = req.sanitize(req.params.id);
    con.query("UPDATE user SET block = 2 WHERE id_user = ? and block!=2", id_user, function (err,
        result) {
        if (!err) {
            console.log(result);
            res.status(200).send("User successfully deleted");
        } else {
            console.log(err);
            res.status(500).send("Something went wrong, please try again");
        }
    });
}

function addUsersAdmin(req, res) {
    let id_user_type = req.sanitize(req.body.id_user_type);
    let name = req.sanitize(req.body.name);
    let username = req.sanitize(req.body.username);
    let password = req.sanitize(req.body.password);
    let email = req.sanitize(req.body.email);
    let photo = req.sanitize(req.body.photo);
    let location = req.sanitize(req.body.location);
    let birth = req.sanitize(req.body.birth);
    let message = null

    bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
            con.query(`INSERT INTO user (id_user_type, block, name, username, password, email, photo, location, birth) VALUES ('${id_user_type}', '0', '${name}', '${username}', '${hash}', '${email}', '${photo}', '${location}', '${birth}')`, (queryErr, result) => {
                if (!queryErr) {
                    message = "User created with success"
                    res.status(200).send(result);
                }
            })
        } else {
            message = "Something went wrong, please try again."
            res.status(500).send(message)
        }
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUsers,
    updateUser,
    deleteUser,
    blockUser,
    addUsersAdmin,
    updateProfile,
}