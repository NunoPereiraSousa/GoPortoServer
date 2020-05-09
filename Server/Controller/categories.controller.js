const bcrypt = require('bcrypt');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getCategories(req, res) {
    con.query(`SELECT * FROM category`, (queryErr, result) => {
        if (!queryErr) {
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function addCategory(req, res) {
    let category = {
        block: 1,
        category_name: req.body.category_name,
        photo: req.body.photo
    }
    
    con.query(`INSERT INTO category SET ?`, category, (queryErr, result) => {
        if (!queryErr) {
            console.log("Category inserted");
            return res.send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getCategoryByID(req, res) {
    let id_category = req.params.id;
    con.query("SELECT * FROM category WHERE id_category = ?", id_category, function (err,
        result) {
        if (!err) {
            return res.json(result[0]);
        } else
            console.log('Error while performing Query.', err);
    });
}

function updateCategory(req, res) {
    let id_category = req.params.id;
    let category_name = req.body.category_name;
    con.query("UPDATE category SET category_name = ? WHERE id_category = ?", [category_name, id_category], function (err,
        result) {
        if (!err) {
            res.send(result);
        } else
            throw err;
    });
}

function deleteCategory(req, res) {
    let id_category = req.params.id;
    con.query("UPDATE category SET block = 2 WHERE id_category = ?", id_category, function (err,
        result) {
        if (!err) {
            return res.json(result);
        } else
            throw err;
    });
}

module.exports = {
    getCategories,
    getCategoryByID,
    addCategory,
    updateCategory,
    deleteCategory
}