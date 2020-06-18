const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getFollowedByUserId(req, res) {
    let id_user = req.sanitize(req.params.id)

    con.query("SELECT * FROM followed_itinerary WHERE id_user = ? and block = '1'", id_user, (queryErr, result) => {
        if (!queryErr) {
            if (result.length > 0) {
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


function getAllFollowed(req, res) {
    con.query(`SELECT 
    followed_itinerary.id_itinerary,
    followed_itinerary.id_user,
    itinerary.name,
    user.username
FROM
    ((D3c9hRhknT.followed_itinerary
    INNER JOIN D3c9hRhknT.itinerary ON itinerary.id_itinerary = followed_itinerary.id_itinerary)
    INNER JOIN D3c9hRhknT.user ON followed_itinerary.id_user = user.id_user)
WHERE
    followed_itinerary.block = 1`, (queryErr, result) => {
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



function addFollowed(req, res) {
    let follow = {
        id_user: req.sanitize(req.body.id_user),
        id_itinerary: req.sanitize(req.body.id_itinerary),
        block: 1,
    }

    con.query("INSERT INTO followed_itinerary SET ?", follow, (queryErr, result) => {
        if (!queryErr) {
            console.log("followedItinerary inserted");
            res.status(200).send("followed Itinerary inserted");
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function deleteFollowed(req, res) {
    let id_user = req.sanitize(req.body.id_user);
    let id_itinerary = req.sanitize(req.body.id_itinerary)
    con.query("UPDATE followed_itinerary SET block = 2 WHERE id_user = ? and id_itinerary = ? and block= 1 ", [id_user, id_itinerary], function (err,
        result) {
        if (!err) {
            res.status(200).send("Followed Deleted");
        } else
            res.status(500).send(err);
    });
}
module.exports = {
    getFollowedByUserId,
    addFollowed,
    deleteFollowed,
    getAllFollowed
}