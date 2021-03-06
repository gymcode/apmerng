const {gql} = require('apollo-server')

module.exports = gql`
    type Post {
        id: ID!, 
        body: String!
        username: String!
        createdAt: String!, 
        comments: [Comment]!, 
        likes: [Like]
    }

    type Comment{
        id: ID!, 
        body: String!, 
        username: String!, 
        createdAt: String!
    }

    type Like {
        id: ID!, 
        username: String!, 
        createdAt: String!
    }

    type User{
        id: ID!, 
        email: String!, 
        token: String!, 
        username: String!, 
        createdAt: String!
    }

    input RegisterInput {
        username: String!, 
        email: String!, 
        password: String!, 
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postID: ID!): Post
    }

    type Mutation{
        register(registerUser: RegisterInput): User!
        login(email: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postID: ID!): Boolean!
        createComment(postID: ID!, body: String!): Post!
        deleteComment(postID: ID!, commentId: ID!): Post!
        likePost(postID: ID): Post!
    }
`