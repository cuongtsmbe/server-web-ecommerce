const customerModel = require("../models/customer.model");
const crypto=require('crypto');

module.exports = {
    customerRouters:function(app){
        app.get('/customer/:id'                     ,this.getOneByID);
        app.put('/customer/editPassword/:id'        ,this.checkPasswordInput,this.editPassWord);

    },
     //get thong tin khach hang theo ID
     getOneByID:async function(req,res,next){
        var condition={
            id:req.params.id
        };
        var customer=await customerModel.getOne(condition);
        delete customer.mat_khau;
        delete customer.salt;
        res.status(200).json({
            status:200,
            data:customer
        });
    },
     //kiem tra password 
     checkPasswordInput:function(req,res,next){
        var response={
            status:201,
            message:""
        };

        var empty=0;
        if(req.body.mat_khau==undefined || req.body.mat_khau==''){empty=1;}   
        if(empty==1){
            response.message="Du lieu khong day du.";
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
            id:req.params.id,
        };
        var value={
            oldPassword: req.body.oldPassword,
            newPassword:req.body.newPassword
        };
        //get customer by ID 
        var customer=await customerModel.getOne(condition);
        if(customer.length==0){
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
                        response.status=201;
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