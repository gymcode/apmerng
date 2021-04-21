const User = require('../../Database/user')

module.exports = {
    Mutation: {
        register: (_, {registerUser: {username, email, password, confirmPassword}})=>{
            // user validation 
            // checking if user already exists
            // hashing the user's password 
        }
    }
}