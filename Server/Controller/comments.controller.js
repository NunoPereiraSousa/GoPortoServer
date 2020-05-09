const bcrypt = require('bcrypt');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getCommentsByIdentityId(req, res) {

    let identity_id = req.params.id
    console.log(identity_id);


    con.query("SELECT * FROM comment WHERE id_identity = ?", identity_id, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addComment(req, res) {
    let comment = {
        date_hour: req.body.date_hour,
        id_user: req.body.id_user,
        id_identity: req.body.id_identity,
        comment_text: req.body.comment_text,
        num_star: req.body.num_star,
    }

    con.query(`INSERT INTO comment SET ?`, comment, (queryErr, result) => {
        if (!queryErr) {
            console.log("comment inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

module.exports = {
    getCommentsByIdentityId,
    addComment,
}