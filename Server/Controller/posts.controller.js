const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getPostByUserId(req, res) {
    let id_user = req.sanitize(req.params.id)

    con.query(`SELECT * FROM post WHERE id_user = ? AND block = 1;`, id_user, (queryErr, result) => {
        if (!queryErr) {
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(204).send(result)
            }
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addPost(req, res) {
    let post = {
        id_user: req.sanitize(req.body.id_user),
        content: req.sanitize(req.body.content),
        date: req.sanitize(req.body.date),
        block: 1,
    }

    con.query(`INSERT INTO post SET ?`, post, (queryErr, result) => {
        if (!queryErr) {
            console.log("Post inserted");
            res.status(200).send(result);
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function deletePost(req, res) {
    let id_post = req.params.id;
    con.query("UPDATE post SET block = 2 WHERE id_post = ?", id_post, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getPostByUserId,
    addPost,
    deletePost
}