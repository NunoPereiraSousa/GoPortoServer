const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getIdentities(req, res) {
    con.query(`SELECT * FROM identity`, (queryErr, result) => {
        if (!queryErr) {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(204).send(result) // 204 means that there is noting to show
            }
        } else {
            return res.status(500).send("Something went wrong, please try again");
        }
    })
}

function addIdentity(req, res) {
    let identity = {
        block: 1,
        name: req.sanitize(req.body.name),
        id_category: req.sanitize(req.body.id_category),
        lat: req.sanitize(req.body.lat),
        lng: req.sanitize(req.body.lng)
    }

    con.query("INSERT INTO identity SET ?", identity, (queryErr, result) => {
        if (!queryErr) {
            console.log("Identity inserted");
            res.status(200).send(result);
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getIdentityByID(req, res) {
    let id_identity = req.sanitize(req.params.id);
    con.query("SELECT * FROM identity WHERE id_identity = ?", id_identity, function (err,
        result) {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            res.status(400).send(err);
        }

    });
}

// !!!!!!!!!!!!<this must be changed 
function updateIdentity(req, res) {
    let id_identity = req.sanitize(req.params.id);
    let name = req.sanitize(req.body.name);
    let information = req.sanitize(req.params.information);
    let id_category = req.sanitize(req.params.id_category);
    let lat = req.sanitize(req.params.lat);
    let lng = req.sanitize(req.params.lng);
    let image = req.sanitize(req.params.image);
    con.query("UPDATE identity SET name = ?,information = ?,id_category = ?,lat = ?,lng = ?,image = ?  WHERE id_identity = ?", [name, information, id_category, lat, lng, image, id_identity], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send(err);
    });
}
// !!!!!!!!!!!!1this must be changed>
function deleteIdentity(req, res) {
    let id_identity = req.sanitize(req.params.id);
    con.query("UPDATE identity SET block = 2 WHERE id_identity = ? and block != 2", id_identity, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
            res.status(500).send("Something went wrong, please try again")
        }

    });
}

module.exports = {
    getIdentities,
    getIdentityByID,
    addIdentity,
    updateIdentity,
    deleteIdentity
}