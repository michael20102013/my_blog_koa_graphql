const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');


//用户逻辑控制
const UserController = require('../../controller/user.js');

const UserOutputType = new GraphQLObjectType({
    name: 'user_operage_type',
    fields() {
        return {
            name: { type: GraphQLString },
            token: { type: GraphQLString }
        }
    }
})
const postLogin = {
    description: 'postlogin',
    type: UserOutputType,
    args: {
        username: {
            name: 'username',
            type: GraphQLString
        },
        password: {
            name: 'password',
            type: GraphQLString
        }
    },
    async resolve(root, params, options) {
        let user = await UserController.postLogin({
            username: params.username,
            password: params.password
        });
        return user;
    }
}

module.exports = {
    postLogin
}