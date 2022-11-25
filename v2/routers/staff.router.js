const config     = require("../config/default.json");
const staffModel = require("../models/staff.model");
const permissionModel= require("../models/permission.model");
const passwordValidator = require('password-validator');
const crypto=require('crypto');
const LINK = require("../util/links.json");
module.exports = {
    staffRouters:function(app){
        app.get(    LINK.ADMIN.STAFF_GET_LIST           ,this.setDefault,this.getListStaff);
        app.post(   LINK.ADMIN.STAFF_ADD                ,this.checkInput,this.checkPasswordAndUsername,this.add);
        app.put(    LINK.ADMIN.STAFF_EDIT               ,this.checkInput,this.update);
        app.get(    LINK.ADMIN.STAFF_GET_DETAILS        ,this.getOneByID);
        app.delete( LINK.ADMIN.STAFF_DELETE             ,this.delete);
    },
    setDefault:function(req,res,next){
        if(req.query.search==undefined){
            req.query.search='';
        }
        if(req.query.page==undefined || req.query.page<=0){
            req.query.page=1;
        }
        next();
    },

    //kiem tra password 
    checkPasswordAndUsername:function(req,res,next){
        var response={
            status:203,
            message:""
        };
        var empty=0;
        var password=req.body.matkhau;

        if(password==undefined || password==''){empty=1;}
        if(req.body.ten_dangNhap==undefined || req.body.ten_dangNhap==''){empty=1;}


        if(empty==1){
            response.status=205;
            response.message="Thieu password OR username.";
            return res.json(response);
        }
        //validate password

        // Create a schema
        var schema = new passwordValidator();
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
            return res.json({
                status:208,
                error:"password",
                errorValidate:schema.validate(password, { details: true })
            });

        }

        next();
    },
    //kiem tra du lieu them vao khong duoc empty
    checkInput:function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var empty=0;
        if(req.body.id_quyen==undefined || req.body.id_quyen==''){empty=1;}
        if(req.body.ten_nv==undefined || req.body.ten_nv==''){empty=1;}
        if(req.body.phone==undefined || req.body.phone==''){empty=1;}
        if(req.body.email==undefined || req.body.email==''){empty=1;}
    
        if(empty==1){
            response.status=210;
            response.message="Du lieu khong day du.";
            return res.json(response);
        }else{
            next();
        }

    }
    ,
    //lay danh sach nhan vien
    getListStaff:async function(req,res,next){
        var condition={
            ten_nv      :req.query.search,
            limit       :config.limitStaff,
            offset      :(req.query.page-1)*config.limitStaff
        };
        
        var [data,countResult]=await Promise.all([
            staffModel.getList(condition),
            staffModel.getList(condition,1),
           ]);

        res.json({
            status:200,
            data,
            countNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
        })  
    },
    //them nhan vien 
    //0. random salt
    //1. kiem tra ID quyen và username co ton tai hay khong 
    //2. hash password
    //3. Insert nhan vien 
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //0
        var salt = crypto.randomBytes(config.crypto_salt).toString("hex");
        var value={
            id_quyen    :req.body.id_quyen,
            ten_nv      :req.body.ten_nv,
            ten_dangNhap   :req.body.ten_dangNhap,
            mat_khau    :req.body.matkhau,
            phone       :req.body.phone,
            email       :req.body.email,
            salt        :salt
        };
        //1
        var [permission,staff,staffInfo]=await Promise.all([
            permissionModel.getOneByID({id:value.id_quyen}),
            staffModel.getByCondition({ten_dangnhap:value.ten_dangNhap}),
            staffModel.getByCondition({email:value.email}),
           ]);

        //email exist 
        if(staffInfo.length!=0){
            response.status=217;
            response.message="Email exist.";
            return res.json(response);
        }
        
        if(permission.length==0){

            response.status=211;
            response.message="Id quyen khong thoa man";
            return res.json(response);

        }else if(staff.length!=0){

            response.status=215;
            response.message="Username exist";
            return res.json(response);
           
        }else{
            //2
            crypto.pbkdf2(value.mat_khau, value.salt, 310000, 32, 'sha256',async function(err, hashedPassword) {
                if(err){
                    response.status=500;
                    response.message="server error";
                    return res.json(response);
                
                }
                value.mat_khau=hashedPassword.toString("hex"); 
                //3
                var result=await staffModel.add(value);
                if(result.affectedRows!=0){
                    response.message=`Them nhan vien thanh cong .`;
                }else{
                    response.status=212;
                    response.message=`Them nhan vien khong thanh cong .`;
                }
                return res.json(response);
            }); 
           
        }

    },
    //lay chi tiet thong tin nhan vien theo ID
    getOneByID:async function(req,res,next){
            var condition={
                id:req.params.id
            };
            var staff=await staffModel.getOneByID(condition);
            res.json({
                status:200,
                data:staff
            });
    },

    //edit thong tin nhan vien 
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value={
            id_quyen :req.body.id_quyen,
            ten_nv  :req.body.ten_nv,
            phone    :req.body.phone,
            email   :req.body.email
        };
       

        var staffInfoByID = await staffModel.getByCondition(condition);

        if(staffInfoByID.length==0){
            return res.json({
                status:201,
                message:"update khong thanh cong"
            });
        }
        
        //check email exist
        if( staffInfoByID[0].email!=value.email){
            
            var staffInfo =await staffModel.getByCondition({email:value.email});

            if(staffInfo.length!=0){
                response.status=203;
                response.message="Email đã tồn tại ";    
                return res.json(response);  
            }

        }


        var result=await staffModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=201;
            response.message="update khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thanh cong";  
        }
        res.json(response);
    },
    //delete nhan vien theo ID
    delete:async function(req,res,next){
            var response={
                status:201,
                message:""
            };
            var condition={
                id:req.params.id
            };
            var result=await staffModel.update(condition,{trangthai:-2});
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