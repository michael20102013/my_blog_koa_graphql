const {
    GraphQLObjectType, //对象类型
    GraphQLString, //字符串类型
    GraphQLList, //数组类型
    GraphQLInt //int类型
} = require('graphql');

//文章业务逻辑控制
const ArticleController = require('../../controller/article.js');

//定义评论对象
let commentType = new GraphQLObjectType({
    name: 'commentType',
    fields() {
        return {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            comment_content: { type: GraphQLString }            
        }
    }
})

//定义单个文章对象
let ArticlesType = new GraphQLObjectType({
    name: 'single_article_type',
    fields() {
        return {
            _id: { type:GraphQLString },
            page_view_time: { type: new GraphQLList(GraphQLString) },
            user_view: { type: new GraphQLList(GraphQLString)},
            comment: { type: new GraphQLList(commentType) },
            page_view_count: { type: GraphQLInt }, 
            md_content: { type: GraphQLString }, 
            html_content: { type: GraphQLString }, 
            update_time: { type: GraphQLString }, 
            create_time: { type: GraphQLString }, 
            title: { type: GraphQLString }, 
            user_view_count: { type: GraphQLInt }, 
            comment_count: { type: GraphQLInt }           
        }
    }
})

//定义文章列表对象
let articleList = {
    name: 'query articles list',
    type: new GraphQLList(ArticlesType),
    args: {
        id: {
            name: 'id',
            type: GraphQLString
        },
        limit: {
            name: 'limit',
            type: GraphQLInt,
        },
        skip: {
            name: "skip",
            type: GraphQLInt
        }
    },
    async resolve(root, params, options) {
        let result = await ArticleController.queryArticle({
            id: params.id,
            limit: params.limit,
            skip: params.skip
        });
        return result;
    }
}

module.exports = {
    articleList
}