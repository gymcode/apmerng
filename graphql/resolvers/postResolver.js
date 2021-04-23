const Post = require('../../Database/post')

module.exports = {
    Query: {
        getPosts: async()=>{
            try {
                const posts = await Post.find()
                console.log(posts)
                return posts;
            } catch (error) {
                throw new Error(error)
            }
        }, 

        getPost: async(_, {postID})=>{
            try {
                const post = await Post.findById(postID)
                console.log(post)

                if (post) {
                    return post;
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}