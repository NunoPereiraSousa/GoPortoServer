const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getSuggestions(req, res) {
    con.query(`SELECT * FROM suggestion`, (queryErr, result) => {
        if (!queryErr) {
            res.status(200).send(result);
        } else {
            res.status(500).send({
                "error": queryErr
            });
        }
    })
}

function updateSuggestion(req, res) {
    let id_suggestions = req.sanitize(req.params.id);
    let id_status = req.sanitize(req.body.status);

    con.query("UPDATE suggestion SET id_status = ? WHERE id_suggestion = ?", [id_status, id_suggestions], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send(err)
        }
    });
}

function addSuggestion(req, res) {
    let suggestion = {
        id_user: req.sanitize(req.body.id_user),
        photo: req.sanitize(req.body.photo),
        content: req.sanitize(req.body.content),
        new_identity: req.sanitize(req.body.new_identity),
        id_status: 2,
        category_name: req.sanitize(req.body.category_name)
    }

    con.query("INSERT INTO suggestion SET ?", suggestion, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send(err)
        }
    });
}

module.exports = {
    getSuggestions,
    updateSuggestion,
    addSuggestion
}