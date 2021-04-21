const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag'); 
const mongoose = require('mongoose')
const {MONGODB} = require('./config')

//database stuff
const Post = require('./Database/post')
const User = require('./Database/user')

const typeDefs = require('./graphql/typeDefs')

const resolvers = {
   
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

