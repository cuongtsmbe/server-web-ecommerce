const staffModel = require("../models/staff.model");
const config    =require("../config/default.json");
const crypto=require('crypto');
const str2ab = require('string-to-arraybuffer');
const jwt = require("jsonwebtoken");
module.exports = {
    AuthenticateRouters:function(app){
        app.post('/admin/authenticate/login/local'                ,this.loginLocal);
        app.post('/admin/authenticate/refreshToken'               ,this.getAccessToken);
        app.post('/admin/authenticate/statusToken'                ,this.statusToken);
    },
    //LOGIN ADMIN LOCAL
    loginLocal:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        
        var value={
            username:req.body.username.trim(),
            password:req.body.password 
        };
        //kiem tra username có tồn tại chưa
        var staff=await staffModel.getByCondition({ten_dangnhap:value.username});
        
        if(0==staff.length){
            response.status=210;
            response.message="Incorrect username or password .";
            res.json(response);
            return false;
        }
        staff=staff[0];
        //3.kiểm tra password(chua hash) với password của staff trên DB 
        crypto.pbkdf2(value.password,staff.salt, 310000,32, 'sha256',async function(err, hashedPassword) {
            if (err) {
                res.json({
                    status:500,
                    message:"Server error."
                });            
                return false;
            }
            //cover to String hex 
            hashedPassword=hashedPassword.toString("hex");
            if (!crypto.timingSafeEqual(str2ab(String(staff.mat_khau)),str2ab(String(hashedPassword)))) {
                response.status=210;
                response.message="Incorrect username or password.";
                res.json(response);
                return false;
            }
             //4.Create and assign token
            try{
                var payload={
                            id: staff.Ma_nhan_vien,
                            username:staff.ten_dangnhap,
                            user_permission:staff.id_quyen,
                            user_type:'ADMIN',
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        };
                //create AccessToken AND refreshToken
                const AccessToken = jwt.sign(payload, config.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
                const refreshToken = jwt.sign(payload, config.TOKEN_SECRET_REFRESHTOKEN,{ expiresIn:"1d" });
                
                //reponse
                res.json({
                    status:200,
                    message:"Login success.",
                    user:{
                        username:value.username,
                        name:staff.ten_nv,
                        email:staff.email,
                        AccessToken:AccessToken,
                        refreshToken:refreshToken
                    }
                
                });  
            }catch(err){
                res.status(500).json({
                    status:500,
                    message:"server error."
                })
            }      
        });
    },

    //refreshToken : get new accesstoken
    getAccessToken:async function(req,res,next){
         //kiểm tra  refreshToken
         try{
            var refreshToken=req.body.user.refreshToken;

            if(!refreshToken){
                res.status(401).json({message_refreshToken:"refreshToken false"});
                return ;
            }        

            //verified resfreshToken 
            const verified = jwt.verify(refreshToken, config.TOKEN_SECRET_REFRESHTOKEN);  
            
            //create AccessToken
            var payload={
                id: verified.id,
                username:verified.username,
                user_permission:verified.user_permission,
                user_type:verified.user_type,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            };
            const AccessToken = jwt.sign(payload, config.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
            
            //send accessToken
            res.status(200).json({
                AccessToken:AccessToken
            });
        }catch(err){

            res.json({message_refreshToken:"refreshToken false"});
            return ;

        } 
    },

    //STATUS ACCESSTOKEN AND REFRESHTOKEN
    //dễ dang hơn cho FE khi chặn người dùng đến trang login
    statusToken:async function(req,res,next){
        var response={
            message_accessToken:"",
            message_refreshToken:""
        };

        //kiểm tra  refreshToken
        try{
            var refreshToken=req.body.user.refreshToken;
            if(!refreshToken){
                res.json({message_refreshToken:"refreshToken false"});
                return ;
            }        
            
            const verified = jwt.verify(refreshToken, config.TOKEN_SECRET_REFRESHTOKEN); 
            reponse.message_refreshToken="refreshToken OK";
        }catch(err){

            res.json({message_refreshToken:"refreshToken false"});
            return ;

        } 
        //kiểm tra  AccessToken
        try{
            var AccessToken=req.body.user.AccessToken;
            if(!AccessToken){
                    reponse.message_accessToken='AccessToken false';
            };
            const verified = jwt.verify(refreshToken, config.TOKEN_SECRET_ACCESSTOKEN); 
            //AccessToken hợp lệ
            reponse.message_accessToken="AccessToken OK";
        }catch(err){
            reponse.message_accessToken='AccessToken false';
        }

        
        res.json(response);
    },

}
