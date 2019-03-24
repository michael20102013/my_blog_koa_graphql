const { articleList } = require('./schemas/articles');
const { postLogin } = require('./schemas/user');


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

//总查询对象
let queryObj = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        articleList: articleList
    })
})

//总体变更对象

console.log('postLogin', postLogin)
let mutationObj = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        postLogin: postLogin
    })
})
//GraphQL总表
let schema = new GraphQLSchema({
    query: queryObj,
    mutation: mutationObj
})
module.exports = schema