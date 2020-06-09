const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getFavoriteByUserId(req, res) {
    let id_user = req.sanitize(req.params.id)
    con.query("SELECT * FROM user_favourite WHERE id_user = ? and block = '1'", id_user, (queryErr, result) => {
        if (!queryErr) {
            if (result > 0) {
                res.status(200).send(result);
            } else {
                res.status(204).send(result);
            }

        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addFavorite(req, res) {
    let favorite = {
        id_user: req.sanitize(req.body.id_user),
        id_identity: req.sanitize(req.body.id_identity),
        date_time: req.sanitize(req.body.date_time),
        block: 1,
    }

    con.query(`INSERT INTO user_favourite SET ?`, favorite, (queryErr, result) => {
        if (!queryErr) {
            console.log("favorite inserted");
            res.status(200).send("favorite inserted");
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function deleteFavorite(req, res) {
    let id_user = req.sanitize(req.body.id_user);
    let id_identity = req.sanitize(req.body.id_identity)
    con.query("UPDATE user_favourite SET block = 2 WHERE id_user = ? and id_identity = ? and block= 1 ", [id_user, id_identity], function (err,
        result) {
        if (!err) {
            res.status(200).send("The user has been updated");
        } else
            res.status(500).send(err);
    });
}

module.exports = {
    getFavoriteByUserId,
    addFavorite,
    deleteFavorite
}