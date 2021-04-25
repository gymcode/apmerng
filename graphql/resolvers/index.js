const postResolver = require('./postResolver')
const userMutation = require('./userResolver')

module.exports = {
    Query: {
        ...postResolver.Query, 
        ...postResolver.Mutation
    }, 
    Mutation: {
        ...userMutation.Mutation
    }

}