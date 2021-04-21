const User = require('../../Database/user')

module.exports = {
    Mutation: {
        register: (_, {registerUser: {username, email, password, confirmPassword}})=>{
            
        }
    }
}