const config     = require("../config/default.json");
const customerModel = require("../models/customer.model");
const crypto=require('crypto');
const LINK = require("../util/links.json");
module.exports = {
    customerRouters:function(app){
        app.get(    LINK.ADMIN.CUSTOMER_GET_LIST            ,this.setDefault,this.getList);
        app.post(   LINK.ADMIN.CUSTOMER_ADD                 ,this.checkInput,this.add);
        app.get(    LINK.ADMIN.CUSTOMER_GET_INFO            ,this.getOneByID);
        app.put(    LINK.ADMIN.CUSTOMER_EDIT_INFO           ,this.checkInput,this.checkTrangthai,this.update);
        app.delete( LINK.ADMIN.CUSTOMER_DELETE              ,this.delete);
    },
    setDefault:function(req,res,next){
        if(req.query.ten==undefined){
            req.query.ten='';
        }
        if(req.query.page==undefined){
            req.query.page=1;
        }
        if(req.query.username==undefined){
            req.query.username='';
        }
        next();
    },
    //lay danh sach 
    //1. lay danh sach theo ten_kh va username , or ten_kh ,or username
    getList:async function(req,res,next){
        var condition={
            ten_kh      :req.query.ten,
            username    :req.query.username,
            limit       :config.limitCustomer,
            offset      :(req.query.page-1)*config.limitCustomer
        };
        var result= await customerModel.getList(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //kiem tra du lieu them vao khong duoc empty
    checkInput:function(req,res,next){
        var response={
            status:201,
            message:""
        };

        var empty=0;
        if(req.body.ten_kh==undefined || req.body.ten_kh==''){empty=1;}
        if(req.body.ten_dangnhap==undefined || req.body.ten_dangnhap==''){empty=1;}
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
    //kiem tra du lieu vao cua trang thai (danh cho update)
    checkTrangthai:function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var empty=0;
        if(req.body.trangthai==undefined || req.body.trangthai==''){empty=1;}
        if(empty==1){
            response.message="Thieu trang thai khach hang.";
            res.json(response);
        }else{
            next();
        }

    }
    ,
    //them khach hang
    //0. random salt for password
    //1. kiem tra username da ton tai.
    //2. hash password và thêm customer mới  
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //0
        var salt = crypto.randomBytes(config.crypto_salt).toString("hex");
        var value={
            ten_kh :req.body.ten_kh,
            ten_dangnhap  :req.body.ten_dangnhap,
            mat_khau   :req.body.mat_khau,
            email :req.body.email,
            dia_chi    :req.body.dia_chi,
            phone   :req.body.phone,
            trangthai:1,
            salt:salt
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
            res.json(response);
            return false;
        }else{
            //2
            crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                value.mat_khau=hashedPassword.toString("hex");
                var result=await customerModel.add(value);
                if(result.affectedRows!=0){
                    //3
                    req.session.user = value.ten_dangnhap;
                    response.message=`Them thanh cong . insertId: ${result.insertId}`;
                }else{
                    response.message=`Them khong thanh cong . `;
                }
                res.json(response);
            }); 

        }
        
    },
    //get thong tin khach hang theo ID
    getOneByID:async function(req,res,next){
            var condition={
                id:req.params.id
            };
            var customer=await customerModel.getOne(condition);
            delete customer[0].mat_khau;
            delete customer[0].salt;
            res.json({
                status:200,
                data:customer
            });
    },
    //edit thong tin khach hang
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value={
            ten_kh :req.body.ten_kh,
            ten_dangnhap  :req.body.ten_dangnhap,
            email :req.body.email,
            dia_chi    :req.body.dia_chi,
            phone   :req.body.phone,
            trangthai:req.body.trangthai
        };

        var customerInfoByID = await customerModel.getOne({condition});
        
        //check email exist
        if(customerInfoByID.length!=0 && customerInfoByID[0].email!=value.email){
            
            var customerInfo = await customerModel.getOne({email:value.email});

            if(customerInfo.length!=0){
                response.status=203;
                response.message="Email đã tồn tại ";    
                return res.json(response);  
            }

        }

        var result=await customerModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=201;
            response.message="update khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thanh cong";  
        }
        res.json(response);
    },
    //delete (update trangthai = -1) customer theo ID
    delete:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value ={
            trangthai:-1
        };
        var result=await customerModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=500;
            response.message="delete khong thanh cong";
            
        }else{
            response.status=200;
            response.message="delete thanh cong";
        }
        res.json(response);
    }

}