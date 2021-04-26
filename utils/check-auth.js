const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
const { SECRET } = require('../config')

module.exports = (context)=>{
    
    const authHeader = context.req.headers.authorization;
    
    if (authHeader) {
        const Token = authHeader.split('Bearer ')[1]
        console.log(Token)
        if (Token) {
            try {
                const user = jwt.verify(Token, SECRET)
                return user;
            } catch (error) {
                throw new AuthenticationError("invalid/expired token")
            }
        } else {
            throw new AuthenticationError("Authentication token must be \' Bearer ")
        }
    } else {
        throw new AuthenticationError("Authorization token must be provided ")
    }
}