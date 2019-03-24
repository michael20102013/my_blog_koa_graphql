const UserModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = require('../config/secret.json');
const util = require('util');
const verify = util.promisify(jwt.verify);
class UserController {
    static async postLogin (ctx) {
        const data = ctx;
        //查询用户
		let user = await UserModel.queryUser(data.username);
		if(user[0]){
			user = user[0];
		}else{
			user = false;
		}
        //转化成json对象
        let strUser = JSON.stringify(user);
        let jsonUsesr = JSON.parse(strUser);
        // if(bcrypt.compareSync(data['password'], jsonUsesr.password)) {
        if (data['password'] === jsonUsesr.password && (data['password'] !== undefined && jsonUsesr.password !== undefined)) {
            //用户 token
            const userToken = {
                name: jsonUsesr.name,
                id: user.id
            }
            // 签发 token
            const token = jwt.sign(userToken, secret.sign, { expiresIn: 3600 * 24 * 30 * 12 * 10 })
            let data = { 'token': token };
            //把token存储到数据库
            // UserModel.updateUser(token,data);
            UserModel.updateUser(jsonUsesr.name, data);
            //解析token
            // let payload = await verify(token, secret.sign);
            return {
                name: userToken.name,
                token: token,
            }
        }
    }
    //登出
    static async loginOut (ctx) {
        let token = ctx.request.header.authorization.split(' ')[1];
        let data = {token:"null"};
            let payload = await verify(token, secret.sign);
            let upTk = await UserModel.updateUser(payload.name, data);
            if(upTk){
                ctx.body = {
                    message:'登出成功',
                    cc:0,
                    token:data.token
                }         
            }else{
                ctx.body = {
                    message:'登出失败',
                    cc:1,
                    token
                }                
            }
    }
    static async judgeJWT(ctx){
        // let token = ctx.request.header.authorization.split(' ')[1];
        // let verifyTk = await common.verifyToken(ctx);
        // if(verifyTk === true){
        //     ctx.body = {
        //         message:'登录状态未失效',
        //         cc:0
        //     }             
        // }
        // else{
        //     ctx.body = {
        //         message:'登录状态已失效',
        //         cc:1
        //     }             
        // }
        ctx.body = {
            message:'登录状态未失效',
            cc:0
        }         
    }
    static async test(ctx){
        ctx.body = {
            message:"成功"
        }
    }
}
module.exports = UserController