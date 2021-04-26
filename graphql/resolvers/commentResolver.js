const {UserInputError} = require('apollo-server')
const Post = require('../../Database/post')
const check_auth = require('../../utils/check-auth')
const {ValidateComment} = require('../../utils/validator')

module.exports = {
    Mutation: {
        createComment: async(_, {postID, body}, context)=>{
            const user = check_auth(context)

            // validation check 
            const {errors, valid} = ValidateComment(body)
            if (!valid) {
                throw new UserInputError("Empty comment", {errors})
            }
            // check if the post already exists
            const checkPost = await Post.findById(postID)

            if (!checkPost) {
                throw new Error("Post is not available in the database")
            } 
            
            post
        }
    }
}