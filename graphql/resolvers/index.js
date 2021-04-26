const postResolver = require('./postResolver')
const userMutation = require('./userResolver')
const commentsMutation = require('./commentResolver')

module.exports = {
    Query: {
        ...postResolver.Query, 
        
    }, 
    Mutation: {
        ...userMutation.Mutation, 
        ...postResolver.Mutation, 
        ...commentsMutation.Mutation
    }

}