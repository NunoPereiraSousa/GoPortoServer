const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getNotificationByUserId(req, res) {
    let user_id = req.params.id

    con.query("SELECT * FROM log_table_notif WHERE id_user = ?", user_id, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addNotification(req, res) {
    let notification = {
        id_user: req.body.id_user,
        id_suggestion: req.body.id_suggestion,
        read_status: req.body.read_status,
        date: req.body.date,
        hour: req.body.hour
    }

    con.query(`INSERT INTO log_table_notif SET ?`, notification, (queryErr, result) => {
        if (!queryErr) {
            console.log("notification inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function updateNotification(req, res) {
    let id_user = req.body.id_user;
    let id_suggestion = req.body.id_suggestion;
    let read_status = req.body.read_status;

    con.query("UPDATE log_table_notif SET read_status = ? WHERE id_suggestion = ? and id_user= ?", [read_status, id_suggestion, id_user], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}

module.exports = {
    updateNotification,
    addNotification,
    getNotificationByUserId,
}