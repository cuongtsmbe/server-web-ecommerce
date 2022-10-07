const config     = require("../config/default.json");
const staffModel = require("../models/staff.model");
const permissionModel= require("../models/permission.model");
module.exports = {
    staffRouters:function(app){
        app.get('/admin/staff/list'          ,this.setDefault,this.getListStaff);
        app.post('/admin/staff/add'          ,this.checkInput,this.add);
        app.put('/admin/staff/edit/:id'      ,this.checkInput,this.update);
        app.get('/admin/staff/:id'           ,this.getOneByID);
        app.delete('/admin/staff/delete/:id' ,this.delete);
    },
    setDefault:function(req,res,next){
        if(req.query.search==undefined){
            req.query.search='';
        }
        if(req.query.page==undefined){
            req.query.page=1;
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
        if(req.body.ten_dangNhap==undefined || req.body.ten_dangNhap==''){empty=1;}
        if(req.body.matkhau==undefined || req.body.matkhau==''){empty=1;}
        if(req.body.phone==undefined || req.body.phone==''){empty=1;}
        if(req.body.email==undefined || req.body.email==''){empty=1;}
    
        if(empty==1){
            response.message="Du lieu khong day du.";
            res.json(response);
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
        var result= await staffModel.getList(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //them nhan vien 
    //1. kiem tra ID quyen co ton tai hay khong 
    //2. Insert nhan vien 
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        
        var value={
            id_quyen :req.body.id_quyen,
            ten_nv  :req.body.ten_nv,
            ten_dangNhap   :req.body.ten_dangNhap,
            mat_khau :req.body.matkhau,
            phone    :req.body.phone,
            email   :req.body.email
        };
        var permission=await permissionModel.getOneByID({id:value.id_quyen});

        if(permission.length==0){
            response.message="Id quyen khong thoa man";
            res.json(response);
        }else{
            var result=await staffModel.add(value);
            if(result.affectedRows!=0){
                response.message=`Them nhan vien thanh cong . insertId: ${result.insertId}`;
            }else{
                response.message=`Them nhan vien khong thanh cong . failed`;
            }
            res.json(response);
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
            ten_dangNhap   :req.body.ten_dangNhap,
            mat_khau :req.body.matkhau,
            phone    :req.body.phone,
            email   :req.body.email
        };

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
            var result=await staffModel.delete(condition);
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