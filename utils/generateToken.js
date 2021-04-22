const {SECRET} = require('../config')
const jwt = require('jsonwebtoken')


function generateToken(user){
    return jwt.sign({
        id: user.id, 
        username: user.username, 
        email: user.email
    }, SECRET, {expiresIn: "1h"})
}

module.exports = {
    generateToken
}