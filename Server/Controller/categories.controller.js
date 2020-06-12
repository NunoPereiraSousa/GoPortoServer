const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getCategories(req, res) {
    con.query(`SELECT * FROM category WHERE block != 2`, (queryErr, result) => {
        if (!queryErr) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Something went wrong please try again later");
        }
    })
}

function addCategory(req, res) {
    let category = {
        block: 1,
        category_name: req.sanitize(req.body.category_name),
        photo: req.sanitize(req.body.photo)
    }

    con.query(`INSERT INTO category SET ?`, category, (queryErr, result) => {
        if (!queryErr) {
            res.status(200).send(result);
        } else {
            res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getCategoryByID(req, res) {
    let id_category = req.sanitize(req.params.id);
    con.query("SELECT * FROM category WHERE id_category = ?", id_category, function (err,
        result) {
        if (!err) {
            if (result.length > 0) {
                res.status(200).send(result[0]);
            } else {
                res.status(400).send(result);
            }
        } else {
            res.status(500).send("Something went wrong, please try again", err)
        }
    });
}

function updateCategory(req, res) {
    let id_category = req.sanitize(req.params.id);
    let category_name = req.sanitize(req.body.category_name);
    con.query("UPDATE category SET category_name = ? WHERE id_category = ?", [category_name, id_category], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Something went wrong, please try again", err);
        }
    });
}

function deleteCategory(req, res) {
    let category_name = req.sanitize(req.params.id);
    con.query("UPDATE category SET block = 2 WHERE category_name = ?", category_name, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send("Something went wrong, please try again", err);
    });
}

module.exports = {
    getCategories,
    getCategoryByID,
    addCategory,
    updateCategory,
    deleteCategory
}