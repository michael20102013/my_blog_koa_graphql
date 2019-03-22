const articleList = require('./schemas/articles');


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');


// let queryObj = new GraphQLObjectType({
//     name: 'query',
//     fields: {
//         articleList: articleList
//     }
// })
const outputType = new GraphQLObjectType({
    name: 'output',
    fields: () => ({
        title: {
            type: GraphQLString
        }
    })
})
let queryObj = new GraphQLObjectType({
    name: 'query',
    fields: {
        title: {
            type: GraphQLString
        }
    }
})

let schema = new GraphQLSchema({
    query: queryObj
})
module.exports = schema