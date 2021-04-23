const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
const { SECRET } = require('../config')

module.exports = (context)=>{
    const authheader = context.req.headers.authorization; 

    if (authheaders) {
        const Token = authheader.split('Bearer ')[1]
        console.log(Token)
        if (Token) {
            try {
                const user = jwt.verify(Token, SECRET)
                return user
            } catch (error) {
                throw new AuthenticationError("invalid/expired token")
            }
        } else {
            throw new AuthenticationError("Authentication token must be \' Bearer ")
        }
    } else {
        throw new AuthenticationError("Authentication toke must be provided ")
    }
}