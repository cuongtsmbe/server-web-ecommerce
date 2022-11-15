const staffModel = require("../models/staff.model");
const config    =require("../config/default.json");
const crypto=require('crypto');
const str2ab = require('string-to-arraybuffer');
const jwt = require("jsonwebtoken");
const sendMail = require("../mdw/sendMail.mdw");
const LINK = require("../util/links.json");
require('dotenv').config();

module.exports = {
    AuthenticateRouters:function(app){
        app.post(LINK.ADMIN.AUTHENTICATE_LOGIN_LOCAL                ,this.loginLocal);
        app.post(LINK.ADMIN.AUTHENTICATE_REFRESHTOKEN               ,this.getAccessToken);
        app.post(LINK.ADMIN.AUTHENTICATE_STATUSTOKEN                ,this.statusToken);
        app.post(LINK.ADMIN.AUTHENTICATE_FORGET_PW                  ,this.forgetPassword);
        app.post(LINK.ADMIN.AUTHENTICATE_UPDATE_PW                  ,this.validatePassword,this.updatePassword);
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
            try{
                //cover to String hex 
                hashedPassword=hashedPassword.toString("hex");
                if (!crypto.timingSafeEqual(str2ab(String(staff.mat_khau)),str2ab(String(hashedPassword)))) {
                    response.status=210;
                    response.message="Incorrect username or password.";
                    res.json(response);
                    return false;
                }
                //4.Create and assign token
           
                var payload={
                            id: staff.Ma_nhan_vien,
                            username:staff.ten_dangnhap,
                            user_permission:staff.id_quyen,
                            user_type:'ADMIN',
                            iat: Math.floor(Date.now() / 1000) + (60 * 60),
                        };
                //create AccessToken AND refreshToken
                const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
                const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET_REFRESHTOKEN,{ expiresIn:"1d" });
                
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
            var refreshToken=JSON.parse(req.body.user).refreshToken;

            if(!refreshToken){
                res.status(401).json({message_refreshToken:"refreshToken false"});
                return ;
            }        

            //verified resfreshToken 
            const verified = jwt.verify(refreshToken, process.env.TOKEN_SECRET_REFRESHTOKEN);  
            
            //create AccessToken
            var payload={
                id: verified.id,
                username:verified.username,
                user_permission:verified.user_permission,
                user_type:verified.user_type,
                iat: Math.floor(Date.now() / 1000) + (60 * 60),
            };
            const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
            
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
            var refreshToken=JSON.parse(req.body.user).refreshToken;
            if(!refreshToken){
                res.json({message_refreshToken:"refreshToken false"});
                return ;
            }        
            
            const verified = jwt.verify(refreshToken, process.env.TOKEN_SECRET_REFRESHTOKEN); 
            reponse.message_refreshToken="refreshToken OK";
        }catch(err){

            res.json({message_refreshToken:"refreshToken false"});
            return ;

        } 
        //kiểm tra  AccessToken
        try{
            var AccessToken=JSON.parse(req.body.user).AccessToken;
            if(!AccessToken){
                    reponse.message_accessToken='AccessToken false';
            };
            const verified = jwt.verify(refreshToken, process.env.TOKEN_SECRET_ACCESSTOKEN); 
            //AccessToken hợp lệ
            reponse.message_accessToken="AccessToken OK";
        }catch(err){
            reponse.message_accessToken='AccessToken false';
        }

        
        res.json(response);
    },

    
    //gửi token xác thực đến email.
    forgetPassword:async function(req,res,next){
        try{
            var email = req.body.email;
            var url_UI_ForgetPW=req.body.urlUI;//link UI chuyển đến trang reset password  

            if(email==undefined || url_UI_ForgetPW==undefined || url_UI_ForgetPW.length==0){
                return res.json({
                    status:402,
                    message: "Nhap thieu thong tin."
                });
            }

            //ktra email co ton tai trong DB
            var staffInfo=await staffModel.getByCondition({email:email});
            if(staffInfo.length==0){
                return res.json({
                    status:404,
                    message: "Gmail khong ton tai."
                })
            }
            if(staffInfo.length>1){
                return res.json({
                    status:500,
                    message: "Có nhiều tài khoản đang dùng Email này.Vì vậy không thể verify password."
                })
            }
            //create token (15 minutes) and send email 
            var staff=staffInfo[0];

            var payload={
                id: staff.Ma_nhan_vien,
                username:staff.ten_dangnhap,
                user_permission:true,
                user_type:'ADMIN',
                iat: Math.floor(Date.now() / 1000) + (60 * 60),
            };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "15m"});

            /** Gui email **/
            sendMail.SendMailForgetPassword(email,token,url_UI_ForgetPW);

            return res.json({
                status:200,
                message:"Had send to email."
            });
        }catch(err){
            console.log(err);
            return res.json({
                status:500,
                message:err
            });
        }
    },
    //1.setting validate password
    //2.validate password
    validatePassword:function(req,res,next){
        //1
        // Create a schema
        var schema = new passwordValidator();
        var password=req.body.password;
        // Add properties to it
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123','Qwerty123','Password1']); // Blacklist these values
        //2
        if(!schema.validate(password)){
            res.json({
                status:200,
                error:"password",
                errorValidate:schema.validate(password, { details: true })
            });
            return false;
        }
        next();
    },
    //cap nhat password tren DB
    updatePassword:async function(req,res,next){
        try{
            var password=req.body.password;
            var staffInfo=await staffModel.getByCondition({id:req.user.id});
            //hash password and update
            crypto.pbkdf2(password, staffInfo[0].salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                
                if(err){
                    return res.json({
                        status:500,
                        message:"server error"
                    });
                }
                
                var mat_khau_hash=hashedPassword.toString("hex");
                var result = await staffModel.update({id:req.user.id},{mat_khau:mat_khau_hash});
                if(result.affectedRows==0){
                    return res.json({
                        status:201,
                        message:"update password khong thanh cong"
                    });  
                }else{
                    return res.json({
                        status:200,
                        message:"update password thanh cong"
                    });
                }
            })
        }catch(err){
            console.log(err);
            return res.json({
                status:500,
                message:err
            });
        }

    },

}
