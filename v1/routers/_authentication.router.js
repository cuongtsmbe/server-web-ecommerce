const crypto=require('crypto');
const passwordValidator = require('password-validator');
const validator = require('validator');
const str2ab = require('string-to-arraybuffer');
const jwt = require("jsonwebtoken");
const customerModel = require("../models/customer.model");
const tokenModel = require("../models/token.model");
const authPhoneModels = require('../models/auth_phone.model');
const authEmailModels = require("../models/auth_email.model");
const mdw = require("../mdw/valid.mdw");
const tokenMdw = require("../mdw/token.mdw");
const sendMail = require("../mdw/sendMail.mdw");
const Random=require("../mdw/random.mdw");
const SMS = require("../mdw/sendSMS.mdw");
const LINK = require("../util/links.json");
const config    =require("../config/default.json");
require('dotenv').config();
const OAuth2Mdw =require("../mdw/authGoogle.mdw");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const clientID=process.env.CLIENT_ID;
const sercetID=process.env.CLIENT_SECRET;


module.exports = {
    AuthenticateClientRouters:function(app){   
        //passport 
        app.use(passport.initialize());
        app.use(passport.session());
        //serialize , deserialize  
        OAuth2Mdw.use(passport);
        passport.use(
            new GoogleStrategy(
              {
                clientID: clientID,
                clientSecret: sercetID,
                callbackURL: LINK.CLIENT.AUTHENTICATE_GOOGLE_CALLBACK
              },
              async function(accessToken, refreshToken, profile, done) {
                console.log("-GoogleStrategy-");
                // find current user in customerModel
                var profileCustomer=await customerModel.getOne({id:profile.id});
                if(profileCustomer.length==0){
                    //save in DB
                    //password default vì hàm login có verify nên sẽ không thể login bằng pw
                    var salt = crypto.randomBytes(config.crypto_salt).toString("hex");
                    var value={
                        id              :profile.id,
                        ten_kh          :profile.displayName,
                        ten_dangnhap    :profile.emails[0].value,
                        mat_khau        :"account login as email.",
                        email           :profile.emails[0].value,
                        dia_chi         :"",
                        phone           :"",
                        trangthai       :1,
                        salt            :salt
                    };               
                    await customerModel.add(value);
                   
                }
                return done(null, profile);
                }
            )
        );
        
        
        app.get(LINK.CLIENT.AUTHENTICATE_GOOGLE_LOGIN                   ,OAuth2Mdw.authenticate(passport));
        app.get(LINK.CLIENT.AUTHENTICATE_GOOGLE_CALLBACK                ,OAuth2Mdw.callback(passport),this.Oauth2CallBack);
        app.get(LINK.CLIENT.AUTHENTICATE_GOOGLE_SUCCESS                 ,this.Oauth2Success);
        app.get(LINK.CLIENT.AUTHENTICATE_GOOGLE_LOGOUT                  ,this.Oauth2Logout);
        app.get(LINK.CLIENT.AUTHENTICATE_GOOGLE_ERROR                   ,this.Oauth2Fail);
        app.post(LINK.CLIENT.AUTHENTICATE_REGISTER_LOCAL                ,this.validatePassword,this.validateRegister,this.register);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGIN_LOCAL                   ,this.loginLocal);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGIN_GET_CODE_PHONE          ,this.loginPhoneGetCode);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGIN_PHONE                   ,this.loginPhone);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGIN_GET_CODE_EMAIL          ,this.loginEmailGetCode);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGIN_EMAIL                   ,this.loginEmail);
        app.post(LINK.CLIENT.AUTHENTICATE_LOGOUT                        ,this.logout);
        app.post(LINK.CLIENT.AUTHENTICATE_FORGET_PW                     ,this.forgetPassword);
        app.post(LINK.CLIENT.AUTHENTICATE_UPDATE_PW                     ,this.validatePassword,this.updatePassword);
        app.post(LINK.CLIENT.AUTHENTICATE_STATUSTOKEN                   ,this.statusToken);
        app.post(LINK.CLIENT.AUTHENTICATE_REFRESHTOKEN                  ,this.getAccessToken);


    },

    Oauth2CallBack: function(req, res) {
        console.log(`-call back : chuyen den: ${config.CLIENT_HOME_PAGE_URL}-`);
        res.redirect(config.CLIENT_HOME_PAGE_URL);
    },
    Oauth2Success: async function(req, res){
        try{
        //req.user from passport.deserializeUser
        return res.json(await tokenMdw.AccessTokenAndRefreshTokenCustomer(req.user));
        }catch(err){
            console.log("Error: undefined req.user at function Oauth2Success");
            //lỗi do truy cập trực tiếp đến url . mà chưa qua deserializeUser
            return res.json({
                status:500,
                message:"Error. Please login again."
            })
        }
    },
    Oauth2Logout:function(req,res,next){
        console.log(`logout - chuyen den: ${config.CLIENT_HOME_PAGE_URL}- `);
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect(config.CLIENT_HOME_PAGE_URL);
          });
       
    },
    Oauth2Fail: function(req, res){
        res.json({status:205,message:"error login"});
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

    //1.validate email
    //2.validate address,dia_chi
    //3.validate username
    //4.validate phone
    validateRegister:function(req,res,next){
        var response={
            status:200,
            error:"",
            errorMessage:""
        };
        //1
        if(!validator.isEmail(req.body.email)){
            response.error="email";
            response.errorMessage   ="Email khong hop le.";
            res.json(response);
            return false;
        }
        //2
        if(req.body.ten_kh || req.body.dia_chi){
            req.body.ten_kh=" ";
            req.body.dia_chi=" ";
        }
        //3
        if(0==req.body.username.trim().length){
            response.error="username";
            response.errorMessage   ="username không được để trống.";
            res.json(response);
            return false;
        }
        
        //4
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
            id              :Date.now(),//id order by milliseconds 
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
        var [customer,customerInfo]=await Promise.all([
            customerModel.getOne({ten_dangnhap:value.ten_dangnhap}),
            customerModel.getOne({email:value.email})
           ]);
             
        //email đã tồn tại
        if(customerInfo.length!=0){

            response.message="Email đã tồn tại.";
            return res.json(response);

        }
        if(customer.length==1){

            response.message="username da ton tai.";
            return res.json(response);

        }else{
            //2
            crypto.pbkdf2(value.mat_khau, value.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                
                if(err){
                    response.status=500;
                    response.message="server error";
                    res.json(response);
                    return false;
                }

                var obj={
                    status: 201,
                    message:"",
                    user:{
                        name:value.ten_kh,
                        username:value.ten_dangnhap,
                        AccessToken:null,
                        refreshToken:null
                    }
                }
                value.mat_khau=hashedPassword.toString("hex");
                var result=await customerModel.add(value);
                if(result.affectedRows!=0){
                    try{
                        var payload={
                            id: value.id,
                            username:value.ten_dangnhap,
                            user_permission:true,
                            user_type:'CUSTOMER',
                            iat: Math.floor(Date.now() / 1000),
                        };

                        //create token 
                        const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
                        const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET_REFRESHTOKEN,{ expiresIn:"30d" });

                        //add refreshToken to DB
                        var result =await tokenModel.add({
                            username:value.ten_dangnhap,
                            refreshToken:refreshToken
                        });

                        if(result.affectedRows==0){
                            throw new Error('insert refreshToken false.');
                        }

                        obj.message=`dang ki thanh cong . insertId: ${result.insertId}`;
                        

                        obj.user.AccessToken=AccessToken;
                        obj.user.refreshToken=refreshToken;

                    }catch(err){
                        console.log(err);
                        res.status(500).json({
                            status:500,
                            message:"server error.",
                            error:err
                        })
                        return ;
                    }    

                }else{
                    obj.status=205;
                    obj.message=`danh ki khong thanh cong . `;
                }
                res.json(obj);
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
            try{
                hashedPassword=hashedPassword.toString("hex");
                if (!crypto.timingSafeEqual(str2ab(String(customer.mat_khau)),str2ab(String(hashedPassword)))) {
                    response.message="Incorrect username or password.";
                    res.json(response);
                    return false;
                }
                //4.Create and assign token
                return res.json(await tokenMdw.AccessTokenAndRefreshTokenCustomer(customer));
                
            }catch(err){
                console.log(err);
                res.status(500).json({
                    status:500,
                    message:"Account don't register for login local(Try login google).",
                    error:err
                })
            }      
        });
    },

    //send code SMS OTP 
    loginPhoneGetCode:async function(req,res,next){
        console.log("SMS Login");
        var verificationCode = Random.rand(100000, 999999);
        var toPhone = req.body.Phone;
        var content = `your code (use in 60 second) is : ${verificationCode}`;
        console.log(toPhone);
        if(!toPhone){
            return res.json({
                status:400,
                message:"Please enter your phone number."
            });
        }

        var payload={
            phone:toPhone,
            code:verificationCode,
            iat: Math.floor(Date.now() / 1000) ,
        };
        const tokenPhoneCode = jwt.sign(payload, process.env.TOKEN_SECRET_PHONECODETOKEN,{ expiresIn:60 });
        
        //lưu code và tokenCode vào DB
        //Chỉ save tokenCode and code khi SDT trên DB chưa có
        //update code and token khi SDT trên DB đã có  
        var Oneresult=await authPhoneModels.get({phone:toPhone});
        if(Oneresult.length==0){
            var resultAdd=await authPhoneModels.add({
                phone:toPhone,
                code:verificationCode,
                tokenCode:tokenPhoneCode
            });
            if( resultAdd.affectedRows==0)
            {
                return res.json({
                    status:505,
                    message:"Error insert code in DB."
                });
            }
        }else{
            var resultUpdate=await authPhoneModels.update({phone:toPhone},{code:verificationCode,tokenCode:tokenPhoneCode});
            if(resultUpdate.affectedRows==0)
            {
                return res.json({
                    status:505,
                    message:"Error insert code in DB."
                });
            }
        }

        //send code to SMS
        SMS.sendSMS(toPhone, content, function(data){
                //khong response data Vì : nếu API send SMS bên thứ 3 không trả về thì sẽ treo request
                console.log(data);
        });
        return res.json({
            status:200,
            message:"check OTP in your phone."
        });
    },

   
    //login with code (OTP)
    loginPhone:async function(req,res,next){
        var verificationCode = req.body.Digits;
        var phoneNumber = req.body.Phone;

        if (!verificationCode || !phoneNumber) {
            return res.json({
                status:400,
                message:'Please enter your Phone number and verify code.'
            });
        } else {
            var [OneResult,customerResult]=await Promise.all([
                await authPhoneModels.get({phone:phoneNumber}),
                await customerModel.getOne({phone:phoneNumber})
               ]);
            
            if(customerResult.length==0){
                return res.json({
                    status:408,
                    message:"SDT chua duoc dang ky.The phone number has not been registered."
                });
            }
            if(OneResult.length==0){
                return res.json({
                    status:205,
                    message:"Yeu cau gui lai OTP."
                });
            }
            if(OneResult.length>1 || customerResult.length>1){
                    console.log(`phone: ${toPhone} ton tai nhieu hon 1`);
                    return res.json({
                        status:505,
                        message:"Khong the login bằng OTP với SDT nay."
                    });
            }

            //kiem tra tokenCode va code
            try{
                const verified = jwt.verify(OneResult[0].tokenCode, process.env.TOKEN_SECRET_PHONECODETOKEN); 
                if(verified.code!=verificationCode){
                    return res.json({
                        status:204,
                        message:"code incorrect."
                    })
                }

                //create va send accesstoken and refreshToken
                var customer=customerResult[0];
                try{
                    return res.json(await tokenMdw.AccessTokenAndRefreshTokenCustomer(customer));
                }catch(err){
                    console.log(err);
                    res.status(500).json({
                        status:500,
                        message:"server error.",
                        error:err
                    })
                }  
            }catch(err){
                return res.json({
                    status:501,
                    message:"code invalid."
                })
            }

            

        }
    },

    //send code to email
    loginEmailGetCode:async function(req,res,next){
        console.log("Email Login");
        var verificationCode = Random.rand(100000, 999999);
        var email=req.body.Email;
        var content = `your code (use in 60 second) is : ${verificationCode}`;

        if(!email){
            return res.json({
                status:400,
                message:"Please enter your email."
            });
        }

        var payload={
            email:email,
            code:verificationCode,
            iat: Math.floor(Date.now() / 1000),
        };
        const tokenCode = jwt.sign(payload, process.env.TOKEN_SECRET_PHONECODETOKEN,{ expiresIn:60 });
        
        //lưu code và tokenCode vào DB
        //Chỉ save tokenCode and code khi SDT trên DB chưa có
        //update code and token khi SDT trên DB đã có  
        
        var Oneresult=await authEmailModels.get({email:email});
        if(Oneresult.length==0){
            var resultAdd=await authEmailModels.add({
                email:email,
                code:verificationCode,
                tokenCode:tokenCode
            });
            if( resultAdd.affectedRows==0)
            {
                return res.json({
                    status:505,
                    message:"Error insert code in DB."
                });
            }
        }else{
            var resultUpdate=await authEmailModels.update({email:email},{code:verificationCode,tokenCode:tokenCode});
            if(resultUpdate.affectedRows==0)
            {
                return res.json({
                    status:505,
                    message:"Error insert code in DB."
                });
            }
        }

        //send code to Email
        sendMail.sendMail(email,"Verify your email address ",content);

        return res.json({
            status:200,
            message:"check your Email."
        });
    },

    //login Email (return token)
    loginEmail:async function(req,res,next){
        var verificationCode = req.body.Digits;
        var email = req.body.Email;

        if (!verificationCode || !email) {
            return res.json({
                status:400,
                message:'Please enter your Email and verify code.'
            });
        } else {
            var [OneResult,customerResult]=await Promise.all([
                await authEmailModels.get({email}),
                await customerModel.getOne({email})
            ]);
            
            if(customerResult.length==0){
                return res.json({
                    status:408,
                    message:"Email chua duoc dang ky.The Email has not been registered."
                });
            }
            if(OneResult.length==0){
                return res.json({
                    status:205,
                    message:"Yeu cau gui lai OTP."
                });
            }
            if(OneResult.length>1 || customerResult.length>1){
                    console.log(`email: ${email} ton tai nhieu hon 1`);
                    return res.json({
                        status:505,
                        message:"Khong the login bằng OTP với Email nay."
                    });
            }

            //kiem tra tokenCode va code
            try{
                const verified = jwt.verify(OneResult[0].tokenCode, process.env.TOKEN_SECRET_PHONECODETOKEN); 
                if(verified.code!=verificationCode){
                    return res.json({
                        status:204,
                        message:"code incorrect."
                    })
                }

                //create va send accesstoken and refreshToken
                var customer=customerResult[0];
                try{
                    return res.json(await tokenMdw.AccessTokenAndRefreshTokenCustomer(customer));
                }catch(err){
                    console.log(err);
                    res.status(500).json({
                        status:500,
                        message:"server error.",
                        error:err
                    })
                }  
            }catch(err){
                return res.json({
                    status:501,
                    message:"code invalid."
                })
            }
        }
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
            var customerInfo=await customerModel.getOne({email:email});
            if(customerInfo.length==0){
                return res.json({
                    status:404,
                    message: "Gmail khong ton tai."
                })
            }
            if(customerInfo.length>1){
                return res.json({
                    status:500,
                    message: "Có nhiều tài khoản đang dùng Email này.Vì vậy không thể verify password."
                })
            }
            //create token (15 minutes) and send email 
            var customer=customerInfo[0];
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

            const token = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: 15*60});

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
    //cap nhat password tren DB
    updatePassword:async function(req,res,next){
        try{
            var password=req.body.password;
            var customerInfo=await customerModel.getOne({id:req.user.id});
            //hash password and update
            crypto.pbkdf2(password, customerInfo[0].salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                
                if(err){
                    return res.json({
                        status:500,
                        message:"server error"
                    });
                }
                
                var mat_khau_hash=hashedPassword.toString("hex");
                var result = await customerModel.update({id:req.user.id},{mat_khau:mat_khau_hash});
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
    //LOGOUT
    //1. delete token có trong DB
    logout:function(req, res, next){
        var response={
            status:201,
            message:""
        };
      
        var token = JSON.parse(req.body.user).refreshToken;
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
            var refreshToken=JSON.parse(req.body.user).refreshToken;
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
            const verified = jwt.verify(refreshToken, process.env.TOKEN_SECRET_REFRESHTOKEN); 
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
    //refreshToken : get new accesstoken
    getAccessToken:async function(req,res,next){
         //kiểm tra  refreshToken
         try{
            var refreshToken=JSON.parse(req.body.user).refreshToken;
     
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
            const verified = jwt.verify(refreshToken, process.env.TOKEN_SECRET_REFRESHTOKEN);  
            
            //create AccessToken
            var payload={
                id: verified.id,
                username:verified.username,
                user_permission:verified.user_permission,
                user_type:verified.user_type,
                iat: Math.floor(Date.now() / 1000),
            };
            const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "1h"});
            console.log("tra ve accesstoken");
            //send accessToken
            res.status(200).json({
                AccessToken:AccessToken
            });
        }catch(err){
            console.log(err);
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
    https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0

****/