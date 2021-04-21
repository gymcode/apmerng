const postResolver = require('./postResolver')

module.exports = {
    Query: {
        ...postResolver.Query
    }, 

}