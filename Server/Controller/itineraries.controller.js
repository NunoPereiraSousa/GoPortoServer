const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getItineraries(req, res) {
    con.query(`SELECT * FROM itinerary`, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addItinerary(req, res) {
    let itinerary = {
        name: req.body.name,
        kids_num: req.body.kids_num,
        adults_num: req.body.adults_num,
        id_deslocation: req.body.id_deslocation,
        id_user: req.body.id_user,
        num_shares: req.body.num_shares,
        block: 1
    }
    
    con.query("INSERT INTO itinerary SET ?", itinerary, (queryErr, result) => {
        if (!queryErr) {
            console.log("itinerary inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getItineraryByID(req, res) {
    let id_itinerary = req.params.id;
    con.query("SELECT * FROM itinerary WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            return res.json(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}

function updateItinerary(req, res) {
    let id_itinerary = req.params.id;
    let name = req.body.name;
    con.query("UPDATE itinerary SET name = ? WHERE id_itinerary = ?", [name, id_itinerary], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}

function deleteItinerary(req, res) {
    let id_itinerary = req.params.id;
    con.query("UPDATE itinerary SET block = 2 WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getItineraries,
    getItineraryByID,
    addItinerary,
    updateItinerary,
    deleteItinerary
}