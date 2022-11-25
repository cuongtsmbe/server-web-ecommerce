const customerModel = require("../models/customer.model");
const crypto=require('crypto');
const LINK = require("../util/links.json");

module.exports = {
    customerRouters:function(app){
        app.get(LINK.CLIENT.CUSTOMER_GET_INFO               ,this.getOneByID);
        app.put(LINK.CLIENT.CUSTOMER_EDIT_PASSWORD          ,this.checkPasswordInput,this.editPassWord);
        app.put(LINK.CLIENT.CUSTOMER_EDIT_INFO              ,this.checkInput,this.update);

    },
     //get thong tin khach hang theo ID
     getOneByID:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;
        var condition={
            id: req.user.id
        };
        var result = await redisClientService.jsonGet(`ProfileCustomer:${condition.id}`);

        if(!result){
           
            result=await customerModel.getOne(condition);
            delete result[0].mat_khau;
            delete result[0].salt;

            await redisClientService.jsonSet(`ProfileCustomer:${condition.id}`,".",JSON.stringify(result));
        
        }else{

            result = JSON.parse(result);
            
        }      
       
       
        res.status(200).json({
            status:200,
            data:result
        });
    },
    //kiem tra du lieu them vao khong duoc empty
    checkInput:function(req,res,next){
        var response={
            status:202,
            message:""
        };

        var empty=0;
        if(req.body.ten_kh==undefined || req.body.ten_kh==''){empty=1;}
        if(req.body.phone==undefined || req.body.phone==''){empty=1;}
        if(req.body.dia_chi==undefined || req.body.dia_chi==''){empty=1;}
        if(req.body.email==undefined || req.body.email==''){empty=1;}
        
        if(empty==1){
            response.message="Du lieu khong day du.";
            res.json(response);
        }else{
            next();
        }

    },
     //edit thong tin khach hang
     update:async function(req,res,next){

        var response={
            status:201,
            message:""
        };
        var condition={
            id: req.user.id
        };
        var value={
            ten_kh :req.body.ten_kh,
            email :req.body.email,
            dia_chi    :req.body.dia_chi,
            phone   :req.body.phone
        };

        var customerInfoByID = await customerModel.getOne(condition);

        if(customerInfoByID.length==0){
            return res.json({status:201,message:"update thong tin khong thanh cong"});
        }

        //check email exist
        if(customerInfoByID[0].email!=value.email){
            var customerEmail=await customerModel.getOne({email:value.email});
            if(customerEmail.length!=0){
                response.status=203;
                response.message="Email đã tồn tại ";    
                return res.json(response);  
            }

        }
        //check phone exist
        if(customerInfoByID[0].phone!=value.phone){
            var customerPhone= await customerModel.getOne({phone:value.phone})
            if(customerPhone.length!=0){
                response.status=203;
                response.message="SDT đã được sử dụng. ";    
                return res.json(response);
            }
        }
        
        //update infomation
        
        var result=await customerModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=201;
            response.message="update thong tin khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thong tin thanh cong";  
            
            //delete in redis
            var redisClientService=res.locals.redisClientService;
            await redisClientService.del(`ProfileCustomer:${condition.id}`);
        }
        res.json(response);
    },

     //kiem tra password 
     checkPasswordInput:function(req,res,next){
        var response={
            status:400,
            message:""
        };

        var empty=0;
        if(req.body.oldPassword==undefined || req.body.oldPassword==''){empty=1;}   
        if(req.body.newPassword==undefined || req.body.newPassword==''){empty=1;}  
        if(empty==1){
            response.message="Chua nhap OldPassword hoac NewPassword.";
            res.json(response);
        }else{
            next();
        }

    },
    //edit password thong tin khach hang
    editPassWord:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id: req.user.id
        };
        var value={
            oldPassword: req.body.oldPassword,
            newPassword:req.body.newPassword
        };
        //get customer by ID 
        var customer=await customerModel.getOne(condition);
        if(customer.length==0){
            response.status=503;
            response.message="Edit password false.";
            res.json(response);
            return false;
        }
        customer=customer[0];
        //kiem tra oldPassword và Update newPassword
        crypto.pbkdf2(value.oldPassword, customer.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
            if(err){
                response.status=500;
                response.message="server error";
                res.json(response);
                return false;
            }
            var oldPassword=hashedPassword.toString("hex");

               //check oldpassword in DB
                var customerOldPw=await customerModel.getOne({
                    id:condition.id,
                    mat_khau:oldPassword
                });

                //Old password wrong
                if(customerOldPw.length==0){
                    response.status=501;
                    response.message="old password wrong.";
                    res.json(response);
                    return false;
                }
                customerOldPw=customerOldPw[0];

                //update password  
                crypto.pbkdf2(value.newPassword, customerOldPw.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                    var newPasswordHash=hashedPassword.toString("hex");
                    var result=await customerModel.update(condition,{mat_khau:newPasswordHash});

                    if(result.affectedRows==0){
                        response.status=502;
                        response.message="update password khong thanh cong";      
                    }else{
                        response.status=200;
                        response.message="update password thanh cong";  
                    }
                    res.json(response);
                    return true;
                }); 


        }); 
    
    },

}