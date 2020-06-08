const jwt = require("jsonwebtoken")
const config = require('../../config/config.js')

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    let id_user = req.headers.id_user // sended inside the header (logged user id) 



    if (!token) {
        return res.sendStatus(401);
    }


    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }else{
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secret, (err, decoded) => {

        if (err || decoded.id != id_user) {
            return res.sendStatus(401)
        }
        next()
    })
}
module.exports = verifyToken;