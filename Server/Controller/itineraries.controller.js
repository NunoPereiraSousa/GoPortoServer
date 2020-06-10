const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getItineraries(req, res) {
    con.query(`SELECT * FROM itinerary`, (queryErr, result) => {
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

function addItinerary(req, res) {
    let itinerary = {
        name: req.sanitize(req.body.name),
        kids_num: req.sanitize(req.body.kids_num),
        adults_num: req.sanitize(req.body.adults_num),
        id_deslocation: req.sanitize(req.body.id_deslocation),
        id_user: req.sanitize(req.body.id_user),
        num_shares: req.sanitize(req.body.num_shares),
        block: 1
    }

    con.query("INSERT INTO itinerary SET ?", itinerary, (queryErr, result) => {
        if (!queryErr) {
            console.log("itinerary inserted");
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getItineraryByID(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    con.query("SELECT * FROM itinerary WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            console.log('Error while performing Query.', err);
            res.status(500).send('Error while performing Query.', err)
        }
    });
}

function updateItinerary(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    let name = req.sanitize(req.body.name);
    con.query("UPDATE itinerary SET name = ? WHERE id_itinerary = ?", [name, id_itinerary], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            throw err;
    });
}

function deleteItinerary(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    con.query("UPDATE itinerary SET block = 2 WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send("Something went wrong please try again", err)
    });
}

function ThreeMostFollowedItineraries(req, res) {
    con.query(`SELECT 
                    num_shares, itinerary.name, user.username
                FROM
                    itinerary
                        INNER JOIN
                    user ON itinerary.id_user = user.id_user
                ORDER BY num_shares DESC , itinerary.name ASC
                LIMIT 3;`, id_itinerary, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send("Something went wrong please try again", err)
    });
}

module.exports = {
    getItineraries,
    getItineraryByID,
    addItinerary,
    updateItinerary,
    deleteItinerary,
    ThreeMostFollowedItineraries
}