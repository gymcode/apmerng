const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')


const typeDefs = gql `
    type Query {
        sayHello: String!
    }
`

const resolvers = {
    Query: {
        sayHello: () => "Hello world"
    }
}

// creating our server
const server = new ApolloServer({
    typeDefs: typeDefs, 
    resolvers: resolvers
})

server.listen({port:  5000})
    .then((res)=>{
        console.log(`server running on ${res.url}`)
    })

    KsMjuhJs9gOaVEpX