const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getFavoriteByUserId(req, res) {
    let id_user = req.sanitize(req.params.id)
    con.query("SELECT * FROM user_favourite_identity WHERE id_user = ? and block = '1'", id_user, (queryErr, result) => {
        if (!queryErr) {
            res.status(200).send(result);
            // if (result > 0) {
            //     res.status(200).send(result);
            // } else {
            //     res.status(204).send(result);
            // }
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}



function getAllFavorite(req, res) {
    con.query(`SELECT 
    user_favourite_identity.id_identity,
    user_favourite_identity.id_user,
    identity.name
FROM
    ((D3c9hRhknT.user_favourite_identity
    INNER JOIN D3c9hRhknT.identity ON identity.id_identity =  user_favourite_identity.id_identity)
    INNER JOIN D3c9hRhknT.user ON user_favourite_identity.id_user = user.id_user)
WHERE
   user_favourite_identity.block = 1`, (queryErr, result) => {
        if (!queryErr) {
            if (result.length === 0) {
                res.status(204).send(result);
            } else {
                res.status(200).send(result);
            }
            return
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}


function addFavorite(req, res) {
    let favorite = {
        id_user: req.sanitize(req.body.id_user),
        id_identity: req.sanitize(req.body.id_identity),
        block: 1,
    }

    con.query(`INSERT INTO user_favourite_identity SET ?`, favorite, (queryErr, result) => {
        if (!queryErr) {
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
    con.query("UPDATE user_favourite_identity SET block = 2 WHERE id_user = ? and id_identity = ? and block= 1 ", [id_user, id_identity], function (err,
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
    deleteFavorite,
    getAllFavorite,
}