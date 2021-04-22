const User = require('../../Database/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {UserInputError} = require('apollo-server')
const {ValidateRegisterInput} = require('../../utils/validator')
const { SALT, SECRET } = require('../../config')

module.exports = {
    Mutation: {
        register: async (_, {registerUser: {username, email, password, confirmPassword}})=>{
            // user validation 
            const {errors, valid} = ValidateRegisterInput(username, email, password, confirmPassword)
            console.log(valid)
            if (!valid) {
                throw new UserInputError("User Errors", {errors})
            }
            // checking if user already exists
            const userCheck = await User.findOne({email})
            if (userCheck) {
                throw new UserInputError("User already exists", {
                    error: "email already in use please try another"
                })
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