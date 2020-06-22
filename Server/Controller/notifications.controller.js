const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getNotificationByUserId(req, res) {
    let user_id = req.sanitize(req.params.id)

    con.query(`SELECT 
    log_table_notif.id_notif,
       log_table_notif.id_suggestion,
      log_table_notif.id_user,
      log_table_notif.answer,
      suggestion.new_identity
FROM
    ((D3c9hRhknT.log_table_notif
    INNER JOIN D3c9hRhknT.suggestion ON suggestion.id_suggestion =  log_table_notif.id_suggestion)
    INNER JOIN D3c9hRhknT.user ON log_table_notif.id_user = user.id_user)
WHERE
   log_table_notif.read_status = 0 and log_table_notif.id_user = ? `, user_id, (queryErr, result) => {
        if (!queryErr) {
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(204).send(result);
            }
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addNotification(req, res) {
    let notification = {
        id_user: req.sanitize(req.body.id_user),
        id_suggestion: req.sanitize(req.body.id_suggestion),
        // read_status: req.sanitize(req.body.read_status),
        answer: req.sanitize(req.body.answer),
        // hour: req.sanitize(req.body.hour)
    }

    con.query(`INSERT INTO log_table_notif SET ?`, notification, (queryErr, result) => {
        if (!queryErr) {
            console.log("notification inserted");
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function updateNotification(req, res) {
    let id_notif = req.sanitize(req.body.id_notification);
    // let id_suggestion = req.sanitize(req.body.id_suggestion);
    // let read_status = req.sanitize(req.body.read_status);

    con.query("UPDATE log_table_notif SET read_status = 1 WHERE id_notif = ?", id_notif, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
            res.status(400).send(err)
        }
    });
}

module.exports = {
    updateNotification,
    addNotification,
    getNotificationByUserId,
}