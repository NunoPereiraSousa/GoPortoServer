const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getSuggestions(req, res) {
    con.query(`SELECT * FROM suggestion`, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function updateSuggestion(req, res) {
    let id_suggestions = req.params.id;
    let id_status = req.body.status;
    
    con.query("UPDATE suggestion SET id_status = ? WHERE id_suggestion = ?", [id_status, id_suggestions], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}
module.exports = {
    getSuggestions,
    updateSuggestion,
}