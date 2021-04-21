const User = require('../../Database/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { } = require('../../config')

module.exports = {
    Mutation: {
        register: async (_, {registerUser: {username, email, password, confirmPassword}})=>{
            // user validation 
            // checking if user already exists
            // hashing the user's password 
            password = await bcrypt.hash(password, 12)
        }
    }
}