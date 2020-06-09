const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getCommentsByIdentityId(req, res) {
    let identity_id = req.sanitize(req.params.id)

    con.query("SELECT * FROM comment WHERE id_identity = ?", identity_id, (queryErr, result) => {
        if (!queryErr) {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(204).send(result); // nothing to show
            }
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addComment(req, res) {
    let comment = {
        date_hour: req.sanitize(req.body.date_hour),
        id_user: req.sanitize(req.body.id_user),
        id_identity: req.sanitize(req.body.id_identity),
        comment_text: req.sanitize(req.body.comment_text),
        num_star: req.sanitize(req.body.num_star),
    }

    con.query(`INSERT INTO comment SET ?`, comment, (queryErr, result) => {
        if (!queryErr) {
            console.log("comment inserted");
            res.status(200).send("Comment inserted");
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

module.exports = {
    getCommentsByIdentityId,
    addComment,
}