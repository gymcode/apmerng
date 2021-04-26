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
            console.log(checkPost)
            if (!checkPost) {
                throw new Error("Post is not available in the database")
            } 
            
            checkPost.comments.unshift({
                body, 
                username: user.username, 
                createdAt: new Date().toISOString()
            })
            await checkPost.save();
            return checkPost;
        },  
        deleteComment: async (_, {postID, commentId}, context)=>{
            const {username} = check_auth(context)

            const post = await Post.findById(postID); 

            if (post) {
                // finding the comment index since it's an array 
                const commentIndex = post.comments.findIndex(c => c.id === commentId)

                //checking if the user deleting the comment is the actual user
                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1)
                    await post.save();
                    return post;
                }
            } else {
                throw new Error("this is error and you know")
            }
        }
    }
}