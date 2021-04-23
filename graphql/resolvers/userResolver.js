const User = require('../../Database/user')
const bcrypt = require('bcryptjs')

const {generateToken} = require('../../utils/generateToken')
const {UserInputError} = require('apollo-server')
const {ValidateRegisterInput, ValidateLoginInput} = require('../../utils/validator')
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

            const token = generateToken(data)

            return {
                ...data._doc, 
                id: data._id,
                token
            }
        }, 

        login: async (_, {email, password})=>{  
            // user validation
            const {errors, valid} = ValidateLoginInput(email, password)
            if(!valid){
                throw new UserInputError('Errors', errors)
            }
            //check if user exists in the database 
            const emailCheck = await User.findOne({email})
            
            if(!emailCheck){
                throw new UserInputError('Errors', {
                    error: "email cannot be found in the database"
                })
            }
            // compare password
            const passMatch = await bcrypt.compare(password, emailCheck.password)
            
            if (!passMatch) {
                throw new UserInputError("Errors", {
                    error: "Password doesn't match one in db"
                })
            }

            const token = generateToken(emailCheck)
            
            return {
                ...emailCheck._doc, 
                id: emailCheck._id,
                token
            }

        }
    }
}