const User = require('../../Database/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SALT, SECRET } = require('../../config')

module.exports = {
    Mutation: {
        register: async (_, {registerUser: {username, email, password, confirmPassword}})=>{
            // user validation 
            // checking if user already exists
            const userCheck = await User.findOne({email})
            if (userCheck) {
                
            }
            // hashing the user's password 
            password = await bcrypt.hash(password, SALT)

            const newUser = new User({
                username, 
                email, 
                password, 
                createdAt: new Date().toString()
            })

            const data = await newUser.save()
            console.log(data)

            const token = jwt.sign({
                id: data.id, 
                username: data.username, 
                email: data.email
            }, SECRET, {expiresIn: "1h"})

            return {
                ...data._doc, 
                id: data._id,
                token
            }
        }
    }
}