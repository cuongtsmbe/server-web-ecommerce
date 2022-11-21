const tokenModel = require("../models/token.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports={
    AccessTokenAndRefreshTokenCustomer:async function(customer){
        var payload={
            id: customer.Ma_kh,
            username:customer.ten_dangnhap,
            user_permission:true,
            user_type:'CUSTOMER',
            iat: Math.floor(Date.now() / 1000),
        };
        //nếu tài khoản bị block thì gắn permission là false
        if(customer.trangthai==-1){
            payload.user_permission=false;
        }

        //create AccessToken AND refreshToken
        const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET_REFRESHTOKEN,{ expiresIn:"30d" });

        //add refreshToken to DB
        var result =await tokenModel.add({
            username:customer.ten_dangnhap,
            refreshToken:refreshToken
        });

        if(result.affectedRows==0){
            throw new Error('insert refreshToken false.');
        }

        //reponse
        return{
            status:200,
            message:"Login success.",
            user:{
                username:customer.username,
                name:customer.ten_kh,
                email:customer.email,
                AccessToken:AccessToken,
                refreshToken:refreshToken
            }

        };  
    }
}
  