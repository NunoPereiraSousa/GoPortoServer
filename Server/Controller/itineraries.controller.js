const bcrypt = require('bcryptjs');
const con = require("../Database/database")
const expressSanitizer = require('express-sanitizer');

function getItineraries(req, res) {
    con.query(`SELECT * FROM itinerary WHERE block != 2`, (queryErr, result) => {
        if (!queryErr) {
            if (result.length === 0) {
                res.status(204).send(result);
            } else {
                res.status(200).send(result);
            }
            return
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}


// ;

function getAllItinerariesComplete(req, res) {
    con.query(`SELECT 
    itinerary_identity.id_itinerary,
    itinerary_identity.id_identity,
    itinerary.name,
    itinerary.kids_num,
    itinerary.adults_num,
    itinerary.id_user,
    itinerary.block,
    identity.id_identity,
    identity.name,
    identity.information,
    identity.category_name,
    identity.lat,
    identity.lng,
    user.username
FROM
    (((D3c9hRhknT.itinerary_identity
    INNER JOIN D3c9hRhknT.itinerary ON itinerary.id_itinerary = itinerary_identity.id_itinerary)
    INNER JOIN D3c9hRhknT.identity ON identity.id_identity = itinerary_identity.id_identity)
	INNER JOIN D3c9hRhknT.user ON itinerary.id_user = user.id_user)
    where itinerary.block = 1
ORDER BY itinerary_identity.id_itinerary
;`, (queryErr, result) => {
        if (!queryErr) {
            if (result.length === 0) {
                res.status(204).send(result);
            } else {
                res.status(200).send(result);
            }
            return
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}







function addIdentityItinerary(req, res) {
    let newData = {
        id_itinerary: req.sanitize(req.body.id_itinerary),
        id_identity: req.sanitize(req.body.id_identity),
    }

    con.query("INSERT INTO itinerary_identity SET ?", newData, (queryErr, result) => {
        if (!queryErr) {
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}



function getLastItineraryId(req, res) {
    con.query(`select id_itinerary from itinerary where block = 1 order by id_itinerary`, (queryErr, result) => {
        if (!queryErr) {
            if (result.length === 0) {
                res.status(204).send(result[result.length - 1]);
            } else {
                res.status(200).send(result[result.length - 1]);
            }
            return
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}










function addItinerary(req, res) {
    let itinerary = {
        name: req.sanitize(req.body.name),
        kids_num: req.sanitize(req.body.kids_num),
        adults_num: req.sanitize(req.body.adults_num),
        id_deslocation: req.sanitize(req.body.id_deslocation),
        id_user: req.sanitize(req.body.id_user),
        num_shares: 0,
        block: 1
    }

    con.query("INSERT INTO itinerary SET ?", itinerary, (queryErr, result) => {
        if (!queryErr) {
            console.log("itinerary inserted");
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                "error": queryErr
            });
        }
    })
}

function getItineraryByID(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    con.query("SELECT * FROM itinerary WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            console.log('Error while performing Query.', err);
            res.status(500).send('Error while performing Query.', err)
        }
    });
}

function updateItinerary(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    let name = req.sanitize(req.body.name);
    con.query("UPDATE itinerary SET name = ? WHERE id_itinerary = ?", [name, id_itinerary], function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            throw err;
    });
}

function deleteItinerary(req, res) {
    let id_itinerary = req.sanitize(req.params.id);
    con.query("UPDATE itinerary SET block = 2 WHERE id_itinerary = ?", id_itinerary, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send("Something went wrong please try again", err)
    });
}




function ThreeMostFollowedItineraries(req, res) {
    con.query(`SELECT 
                    num_shares, itinerary.name, user.username
                FROM
                    itinerary
                        INNER JOIN
                    user ON itinerary.id_user = user.id_user
                ORDER BY num_shares DESC , itinerary.name ASC
                LIMIT 3;`, function (err,
        result) {
        if (!err) {
            res.status(200).send(result);
        } else
            res.status(500).send("Something went wrong please try again", err)
    });
}

module.exports = {
    getAllItinerariesComplete,
    getItineraries,
    getItineraryByID,
    addItinerary,
    updateItinerary,
    deleteItinerary,
    ThreeMostFollowedItineraries,

    getLastItineraryId,
    addIdentityItinerary,
}