const Post = require('../../Database/post')
const check_auth = require('../../utils/check-auth')


module.exports = {
    Mutation: {
        createComment: (_, {postID, body}, context)=>{
            const user = check_auth(context)
        }
    }
}