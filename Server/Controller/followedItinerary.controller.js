const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getFollowedByUserId(req, res) {
    let id_user = req.params.id

    con.query("SELECT * FROM followed_itinerary WHERE id_user = ? and block = '1'", id_user, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addFollowed(req, res) {
    let follow = {
        id_user: req.body.id_user,
        id_itinerary: req.body.id_itinerary,
        date_time: req.body.date_time,
        block: 1,
    }

    con.query("INSERT INTO followed_itinerary SET ?", follow, (queryErr, result) => {
        if (!queryErr) {

            console.log("followedItinerary inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function deleteFollowed(req, res) {
    let id_user = req.body.id_user;
    let id_itinerary = req.body.id_itinerary
    con.query("UPDATE followed_itinerary SET block = 2 WHERE id_user = ? and id_itinerary = ? and block= 1 ", [id_user, id_itinerary], function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}
module.exports = {
    getFollowedByUserId,
    addFollowed,
    deleteFollowed
}