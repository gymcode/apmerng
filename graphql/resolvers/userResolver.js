const User = require('../../Database/user')
const bcrypt = require('bcryptjs')

const GenerateToken = require('../../utils/generateToken')
const {UserInputError} = require('apollo-server')
const {ValidateRegisterInput} = require('../../utils/validator')
const { SALT } = require('../../config')

module.exports = {
    Mutation: {
        register: async (_, {registerUser: {username, email, password, confirmPassword}})=>{
            // user validation 
            const {errors, valid} = ValidateRegisterInput(username, email, password, confirmPassword)

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

            const token = GenerateToken(data)

            return {
                ...data._doc, 
                id: data._id,
                token
            }
        }, 

        
    }
}