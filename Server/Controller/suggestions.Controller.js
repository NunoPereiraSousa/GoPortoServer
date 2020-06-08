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
            console.log(err);
            res.status(500).send(err)
        }

    });
}
module.exports = {
    getSuggestions,
    updateSuggestion,
}