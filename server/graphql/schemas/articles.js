const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');



let articleList = {
    type: GraphQLObjectType,
    args: {},
    resolve(root, params, options) {
        return {
            title: 'titlewcx'
        }
    }
}

module.exports = {
    articleList
}