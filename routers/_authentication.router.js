const customerModel = require("../models/customer.model");
const config    =require("../config/default.json");
const crypto=require('crypto');
const passwordValidator = require('password-validator');
const validator = require('validator');
const mdwAuth=require("../mdw/_authentication.mdw");
const str2ab = require('string-to-arraybuffer');
module.exports = {
    AuthenticateClientRouters:function(app){
        app.post('/authenticate/register/local'             ,this.validateRegister,this.register);
        app.post('/authenticate/login/local'                ,this.loginLocal);
        app.get('/authenticate/logout'                      ,this.logout);
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
        if(!mdwAuth.isVietnamesePhoneNumber(req.body.phone.trim())){
            response.error="phone";
            response.errorMessage   ="Phone khong hop le.";
            res.json(response);
            return false;
        }
        next();
    },
   
    //dang ki tai khoan
    //trim : xóa khoảng trắng đầu và cuối
    //0.kiem tra is login
    //0.1 random salt
    //1.kiểm tra username có tồn tại
    //2.hash password và thêm vào DB nếu thoãn mãn
    //3.save username in session
    register:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //0
        if(req.session.user){
            response.message="User is login.";
            res.json(response);
            return false;
        }
        //0.1
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
            crypto.pbkdf2(req.body.password, value.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                value.mat_khau=hashedPassword.toString("hex");
                var result=await customerModel.add(value);
                if(result.affectedRows!=0){
                    //3
                    req.session.user = value.ten_dangnhap;
                    response.message=`dang ki thanh cong . insertId: ${result.insertId}`;
                }else{
                    response.message=`danh ki khong thanh cong . `;
                }
                res.json(response);
            }); 
        }
       
    },
    //login local
    //1.kiem tra user có đang login không
    //2.kiem tra username có tồn tại chưa
    //3.kiểm tra password(chua hash) với password của customer trên DB 
    //4.save session khi login success
    loginLocal:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //1
        if(req.session.user){
            response.message="User is login.";
            res.json(response);
            return false;
        }
        
        var value={
            username:req.body.username.trim(),
            password:req.body.password 
        };
        //2
        var customer=await customerModel.getOne({ten_dangnhap:value.username});
        
        if(0==customer.length){
            response.message="Incorrect username or password .";
            res.json(response);
            return false;
        }
        customer=customer[0];
        //3
        crypto.pbkdf2(value.password,customer.salt, 310000,32, 'sha256', function(err, hashedPassword) {
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
             //4
            req.session.user=value.username;
            res.json({
                status:200,
                message:"Login success.",
                username:value.username
            });
        
          });
    },
    //logout
    //1.Check if the session is exist
    //2.destroy session
    logout:function(req, res, next){
        var response={
            status:201,
            message:""
        };
        //1
        if(req.session.user) {
            //2
            req.session.destroy();
            response.message="Logout success.";
        }else{
            response.message="Please login.";
        }
        res.json(response);
    }
}