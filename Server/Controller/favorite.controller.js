const bcrypt = require('bcrypt');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getFavoriteByUserId(req, res) {
    let id_user = req.params.id
    con.query("SELECT * FROM user_favourite WHERE id_user = ? and block = '1'", id_user, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addFavorite(req, res) {
    let favorite = {
        id_user: req.body.id_user,
        id_identity: req.body.id_identity,
        date_time: req.body.date_time,
        block: 1,
    }

    con.query(`INSERT INTO user_favourite SET ?`, favorite, (queryErr, result) => {
        if (!queryErr) {
            console.log("favorite inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function deleteFavorite(req, res) {
    let id_user = req.body.id_user;
    let id_identity = req.body.id_identity
    con.query("UPDATE user_favourite SET block = 2 WHERE id_user = ? and id_identity = ? and block= 1 ", [id_user, id_identity], function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getFavoriteByUserId,
    addFavorite,
    deleteFavorite
}