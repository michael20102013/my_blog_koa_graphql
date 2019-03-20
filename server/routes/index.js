const Router = require('koa-router');
const UserController = require('../controller/user.js');
const ArticleController = require('../controller/article.js');
const router = new Router({
	prefix: '/api'
});

const { ApolloServer } = require('apollo-server-koa');
console.log('graphqlKoa', require('apollo-server-koa'))
const userSchema = require('../graphql/user.js')
//用户处理
router.post('/', UserController.postLogin)
router.post('/login', UserController.postLogin)
router.post('/login_out', UserController.loginOut)
router.post('/jwt', UserController.judgeJWT)
//无需登录的处理
router.post('/see/articles', ArticleController.queryArticle);
router.put('/pageview/articles', ArticleController.setPVandUV);
router.post('/comment', ArticleController.commentArticle);
//需登录的处理
router.post('/edit/articles', ArticleController.createArticle);
router.delete('/edit/articles', ArticleController.deleteArticle);
router.put('/edit/articles', ArticleController.updateArticle);
router.post('/query/articles', ArticleController.queryArticle);
router.post('/edit/uploadimg', ArticleController.uploadimg);
router.post('/delete/article', ArticleController.deleteArticle);

// router.post('/test', graphqlKoa(userSchema));

module.exports = router;