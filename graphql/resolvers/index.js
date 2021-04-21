const postResolver = require('./postResolver')
const userMutation = require('.')

module.exports = {
    Query: {
        ...postResolver.Query
    }, 
    Mutation: {
        ...
    }

}