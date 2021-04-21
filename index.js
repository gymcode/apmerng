const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag'); 
const mongoose = require('mongoose')
const {MONGODB} = require('./config')

//database stuff
const Post = require('./Database/post')
const User = require('./Database/user')

const typeDefs = gql `
    type Post {
        id: ID!, 
        body: String!
        username: String!
        createdAt: String!, 
    }

    type Query {
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        getPosts: async()=>{
            try {
                const posts = await Post.find()
                console.log(posts)
                return posts;
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

// creating our server
const server = new ApolloServer({
    typeDefs: typeDefs, 
    resolvers: resolvers
})

// creating a database connection 
mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("database connection established")
        return server.listen({port: 5000})
    })
    .then((res)=>{
        console.log(`server running on port ${res.url}`)
    })
    .catch((error)=>{
        console.log(error)
    })

