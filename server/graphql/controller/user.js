const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

class UserController {
    queryUser() {
        const queryUserObj = new GraphQLObjectType({
            name: 'query user',
            fields: {
                user: {
                    name: ''
                }
            }
        })
    }
}