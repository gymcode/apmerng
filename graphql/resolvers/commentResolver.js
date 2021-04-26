const Post = require('../../Database/post')
const check_auth = require('../../utils/check-auth')


module.exports = {
    Mutation: {
        createComment: async(_, {postID, body}, context)=>{
            const user = check_auth(context)

            // check if the post already exists
            const checkPost = await Post.findById(postID)

            if (!checkPost) {
                throw new Error("Post is not available in the database")
            } 

            const newComment = new 
        }
    }
}