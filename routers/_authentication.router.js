const customerModel = require("../models/customer.model");
const tokenModel = require("../models/token.model");
const config    =require("../config/default.json");
const crypto=require('crypto');
const passwordValidator = require('password-validator');
const validator = require('validator');
const str2ab = require('string-to-arraybuffer');
const jwt = require("jsonwebtoken");
const mdw = require("../mdw/mdw");
module.exports = {
    AuthenticateClientRouters:function(app){
        app.post('/authenticate/register/local'             ,this.validateRegister,this.register);
        app.post('/authenticate/login/local'                ,this.loginLocal);
        app.post('/authenticate/logout'                      ,this.logout);
        app.post('/authenticate/statusToken'                ,this.statusToken);
        app.post('/authenticate/refreshToken'               ,this.getAccessToken);
    },
    //1.setting validate password
    //2.validate password
    //3.validate email
    //4.validate Ten khach hang
    //5.validate username
    //6.validate Address
    //7.validate phone
    validateRegister:function(req,res,next){
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
        var response={
            status:200,
            error:"",
            errorMessage:""
        };
        //3
        if(!validator.isEmail(req.body.email)){
            response.error="email";
            response.errorMessage   ="Email khong hop le.";
            res.json(response);
            return false;
        }
        //4
        if(0==req.body.ten_kh.trim().length){
            response.error="ten_kh";
            response.errorMessage   ="tên không được để trống.";
            res.json(response);
            return false;
        }
        //5
        if(0==req.body.username.trim().length){
            response.error="username";
            response.errorMessage   ="username không được để trống.";
            res.json(response);
            return false;
        }
        //6
        if(0==req.body.dia_chi.trim().length){
            response.error="address";
            response.errorMessage   ="Địa chỉ không được để trống.";
            res.json(response);
            return false;
        }
        //7
        if(!mdw.isVietnamesePhoneNumber(req.body.phone.trim())){
            response.error="phone";
            response.errorMessage   ="Phone khong hop le.";
            res.json(response);
            return false;
        }
        next();
    },
   
    //REGISTER
    //trim : xóa khoảng trắng đầu và cuối
    //0 random salt
    //1.kiểm tra username có tồn tại
    //2.hash password và thêm vào DB nếu thoa mãn
    register:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //0
        var salt = crypto.randomBytes(config.crypto_salt).toString("hex");
        var value={
            ten_kh          :req.body.ten_kh.trim(),
            ten_dangnhap    :req.body.username.trim(),
            mat_khau        :req.body.password,
            email           :req.body.email.trim(),
            dia_chi         :req.body.dia_chi.trim(),
            phone           :req.body.phone.trim(),
            trangthai       :1,
            salt            :salt
        };
        //1
        var customer=await customerModel.getOne({ten_dangnhap:value.ten_dangnhap});

        if(customer.length==1){
            response.message="username da ton tai.";
            res.json(response);
        }else{
            //2
            crypto.pbkdf2(value.mat_khau, value.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                if(err){
                    response.status=500;
                    response.message="server error";
                    res.json(response);
                    return false;
                }
                value.mat_khau=hashedPassword.toString("hex");
                var result=await customerModel.add(value);
                if(result.affectedRows!=0){
                    response.message=`dang ki thanh cong . insertId: ${result.insertId}`;
                }else{
                    response.status=205;
                    response.message=`danh ki khong thanh cong . `;
                }
                res.json(response);
            }); 
        }
       
    },

    //LOGIN LOCAL
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
        var customer=await customerModel.getOne({ten_dangnhap:value.username});

        if(0==customer.length){
            response.message="Incorrect username or password .";
            res.json(response);
            return false;
        }
        customer=customer[0];
        //3.kiểm tra password(chua hash) với password của customer trên DB 
        crypto.pbkdf2(value.password,customer.salt, 310000,32, 'sha256',async function(err, hashedPassword) {
            if (err) {
                res.json({
                    status:500,
                    message:"Server error."
                });            
                return false;
            }
            //cover to String hex 
            hashedPassword=hashedPassword.toString("hex");
            if (!crypto.timingSafeEqual(str2ab(String(customer.mat_khau)),str2ab(String(hashedPassword)))) {
                response.message="Incorrect username or password.";
                res.json(response);
                return false;
            }
             //4.Create and assign token,exp: để token luôn khác nhau trong DB
            try{
                var payload={
                            id: customer.Ma_kh,
                            username:customer.ten_dangnhap,
                            user_permission:true,
                            user_type:'CUSTOMER',
                            iat: Math.floor(Date.now() / 1000) + (60 * 60),
                        };
                //nếu tài khoản bị block thì gắn permission là false
                if(customer.trangthai==-1){
                    payload.user_permission=false;
                }

                //create AccessToken AND refreshToken
                const AccessToken = jwt.sign(payload, config.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
                const refreshToken = jwt.sign(payload, config.TOKEN_SECRET_REFRESHTOKEN,{ expiresIn:"30d" });
                
                //add refreshToken to DB
                var result =await tokenModel.add({
                    username:customer.ten_dangnhap,
                    refreshToken:refreshToken
                });
                
                if(result.affectedRows==0){
                    throw new Error('insert refreshToken false.');
                }

                //reponse
                res.json({
                    status:200,
                    message:"Login success.",
                    user:{
                        username:value.username,
                        name:customer.ten_kh,
                        email:customer.email,
                        AccessToken:AccessToken,
                        refreshToken:refreshToken
                    }
                
                });  
            }catch(err){
                console.log(err);
                res.status(500).json({
                    status:500,
                    message:"server error.",
                    error:err
                })
            }      
        });
    },
    //LOGOUT
    //1. delete token có trong DB
    logout:function(req, res, next){
        var response={
            status:201,
            message:""
        };
      
        var token = req.body.user.refreshToken;
        if(!token){
            response.message="success";
            res.json(response);
            return true;
        }
        //1
        result = tokenModel.delete({refreshToken:token});

        if(result.affectedRows==0){
            response.status="400";
            response.message="delete refreshToken fail.";
        }else{
            response.message="success.";
        }
        res.json(response);
    },

    
   

    //STATUS ACCESSTOKEN AND REFRESHTOKEN
    //dễ dang hơn cho FE khi chặn người dùng đến trang login
    //logic: 
    //Nếu refreshToken không hợp lệ ( thì set refreshToken null tại FE để tránh delete 2 lần gây response sai ở logout )  cho vào login 
    //Nếu AccessToken false nhưng refreshToken OK thì FE => gọi refreshToken để lấy Accesstoken mới 
    //Nếu  AccessToken OK và refreshToken OK thì FE => không cho phép vào trang login
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
            //ktra resfreshToken match với DB
            var result=await tokenModel.getOneRefreshToken({refreshToken:refreshToken});
            
            if(result.length==0){
                res.json({message_refreshToken:"refreshToken false"});
                return ;
            }
            const verified = jwt.verify(refreshToken, config.TOKEN_SECRET_REFRESHTOKEN); 
            reponse.message_refreshToken="refreshToken OK";
        }catch(err){

            //Xóa refreshToken kết hạn trong DB
            if(err== 'jwt expired'){
                await tokenModel.delete({refreshToken:refreshToken});
            }
            //verified bị bất kì lỗi gì đều cho phép login lại
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
    //refreshToken : get new accesstoken
    getAccessToken:async function(req,res,next){
         //kiểm tra  refreshToken
         try{
            var refreshToken=req.body.user.refreshToken;

            if(!refreshToken){
                res.status(401).json({message_refreshToken:"refreshToken false"});
                return ;
            }        
            //ktra resfreshToken match với DB
            var result=await tokenModel.getOneRefreshToken({refreshToken:refreshToken});
            
            if(result.length==0){
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

            //Xóa refreshToken kết hạn trong DB
            if(err== 'jwt expired'){
                await tokenModel.delete({refreshToken:refreshToken});
            }
            res.json({message_refreshToken:"refreshToken false"});
            return ;

        } 
    }

}
/**** 
    Tham khảo : 
    https://www.loginradius.com/blog/engineering/guest-post/how-to-implement-jwt-authentication-in-deno/ 
    https://www.passportjs.org/tutorials/password/session/
    https://www.codementor.io/@manashkumarchakrobortty/authentication-and-authorization-in-node-js-19brdvhsyw
    https://viblo.asia/q/cau-hoi-ve-cach-luu-refresh-token-va-quy-trinh-cua-token-va-refresh-token-eVKBMWVd5kW

****/