const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getIdentities(req, res) {
    con.query(`SELECT * FROM identity`, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addIdentity(req, res) {
    let identity = {
        block: 1,
        name: req.body.name,
        id_category: req.body.id_category,
        lat: req.body.lat,
        lng: req.body.lng
    }

    con.query("INSERT INTO identity SET ?", identity, (queryErr, result) => {
        if (!queryErr) {
            console.log("Identity inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getIdentityByID(req, res) {
    let id_identity = req.params.id;
    con.query("SELECT * FROM identity WHERE id_identity = ?", id_identity, function (err,
        result) {
        if (!err) {
            return res.json(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}

function updateIdentity(req, res) {
    let id_identity = req.params.id;
    let name = req.body.name;
    con.query("UPDATE identity SET name = ? WHERE id_identity = ?", [name, id_identity], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}

function deleteIdentity(req, res) {
    let id_identity = req.params.id;
    con.query("UPDATE identity SET block = 2 WHERE id_identity = ?", id_identity, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getIdentities,
    getIdentityByID,
    addIdentity,
    updateIdentity,
    deleteIdentity
}