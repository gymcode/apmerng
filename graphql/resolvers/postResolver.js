const Post = require('../../Database/post')
const check_auth = require('../../utils/check-auth')

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
                } else{
                    throw new Error("post either doesn't exist or has been deleted")
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }, 

    Mutation: {
        createPost: async(_, {body}, context)=>{
            
            const user = check_auth(context)
            console.log(user); 

            const newPost = new Post({        
                user: user.id,
                body, 
                username: user.username, 
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save(); 

            return post;
        }, 

        deletePost: async(_, {postID}, context)=>{
            // middleware
            const user = check_auth(context)

            try {
                // first find the post 
                const post = await Post.findById(postID)
                // check if the user is the same if the user with the post
                if (user.id === post.username) {
                    await post.delete(); 
                    return "Post delete successfully"
                }else {
                    throw new Error("Action not allowed")
                }              
            } catch (error) {
                throw new Error(error)
            }
        }
    }
   
}