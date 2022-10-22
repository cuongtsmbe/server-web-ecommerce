const config     = require("../config/default.json");
const permissionModel = require("../models/permission.model");
const LINK = require("../util/links.json");
module.exports = {
    permissionRouters:function(app){
        app.get(    LINK.ADMIN.PERMISSION_GET_LIST                      ,this.setDefault,this.getList);
        app.get(    LINK.ADMIN.PERMISSION_GET_DETAILS                   ,this.getOneByID);
        app.post(   LINK.ADMIN.PERMISSION_ADD                           ,this.checkInput,this.add);
        app.post(   LINK.ADMIN.PERMISSION_ADD_DANHMUC                   ,this.checkDanhMuc,this.addDanhMuc);
        app.delete( LINK.ADMIN.PERMISSION_DELETE                        ,this.delete);
        app.delete( LINK.ADMIN.PERMISSION_DELETE_DANHMUC                ,this.deleteDanhMuc);
        app.put(    LINK.ADMIN.PERMISSION_UPDATE_DANHMUC                ,this.checkDanhMuc,this.updateDanhMuc);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.page==undefined){
            req.query.page=1;
        }   
        next();
    },
    //lay danh sach ten va id vai tro quan tri 
    getList:async function(req,res,next){
        var condition={
            limit:config.limitPermission,
            offset:config.limitPermission*(req.query.page-1)
        };
        var result= await permissionModel.get(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //lấy danh sách các thư mục mà quyền đó có thể truy cập 
    getOneByID:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var [permission,detailsPermission]=await Promise.all([
            permissionModel.getOneByID(condition),
            permissionModel.getDetails(condition)
           ]);
        if(permission.length==0){
            response.message="Khong tim thay du lieu permission.";
            res.json(response);
        }else{
            res.json({
                status:200,
                details:{
                    Ten_quyen:permission[0].ten_quyen,
                	Id_permission:permission[0].id,
                },
                data:detailsPermission
            });
        }
    },
     //kiem tra du lieu them vao khong duoc empty
     checkInput:function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var empty=0;
        if(req.body.name==undefined || req.body.name==''){empty=1;}
        if(empty==1){
            response.message="Du lieu khong day du.";
            res.json(response);
        }else{
            next();
        }
    },
    //them vai tro quan tri 
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var value={
            ten_quyen :req.body.name,
        };
        var result=await permissionModel.add(value);
        if(result.affectedRows!=0){
            response.message=`Them thanh cong . insertId: ${result.insertId}`;
        }else{
            response.message=`Them khong thanh cong . failed`;
        }
        res.json(response);

    },
    //delete permission
    delete:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var result=await permissionModel.delete(condition);
        if(result.affectedRows==0){
            response.status=500;
            response.message="delete khong thanh cong";
            
        }else{
            response.status=200;
            response.message="delete thanh cong";
        }
        res.json(response);
    },
    //kiem tra danh muc va permission . table: quyendahmuc
    //1.kiem tra ID quyen (table: quyen) có tồn tại .
    //2.kiem tra danh sach danh muc (ListIDDanhmuc) co bi rong
    checkDanhMuc:async function(req,res,next){
        var condition={
            id:req.params.id
        };
        var response={
            status:201,
            message:""
        };
        var empty=0;
        var Permission= await permissionModel.getOneByID(condition);
        if(req.body.ListIDDanhMuc==undefined || req.body.ListIDDanhMuc.length==0){empty=1;}

        if(empty==1){
            response.message="Danh sach danh muc can them rong (empty).";
            res.json(response);
        }else if(Permission.length==0){
            response.message="ID khong hop le.";
            res.json(response);
        }else{
            next();
        }
    },
    //them danh muc quan ly cho quyen
    //1.chuyen ListIDDanhMuc tu string '[1,2,3]' -> array
      
    //2.add 
    addDanhMuc:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //1
        var arrIdDanhMuc=JSON.parse(req.body.ListIDDanhMuc);
        //2
        var value={
            id_quyen:req.params.id,
            ListIDDanhMuc:arrIdDanhMuc
        };
        var result=await permissionModel.addForPermission(value);

        if(result.affectedRows!=0){
            response.message=`Them thanh cong .`;
        }else{
            response.message=`Them khong thanh cong . failed`;
        }
        res.json(response);
    },
    //xoa tat ca danh muc ma id_permission quan ly 
    deleteDanhMuc:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id_quyen:req.params.id
        };
        var result=await permissionModel.deleteItemByIDPermission(condition);
        if(result.affectedRows==0){
            response.status=500;
            response.message="delete khong thanh cong";
            
        }else{
            response.status=200;
            response.message="delete thanh cong";
        }
        res.json(response);
    },
    //cap nhat danh sach danh muc can quan ly cho id_permission
    //1.chuyen ListIDDanhMuc tu string '[1,2,3]' -> array
    //2.xoa danh muc quan ly cũ
    //3.add danh sach danh muc quan ly mới 
    updateDanhMuc:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        
        //1
        var arrIdDanhMuc=JSON.parse(req.body.ListIDDanhMuc);
        //2
        var condition={
            id_quyen:req.params.id
        };
        var resultDelete=await permissionModel.deleteItemByIDPermission(condition);
        if(resultDelete.affectedRows!=0){
            //3
            var value={
                id_quyen:req.params.id,
                ListIDDanhMuc:arrIdDanhMuc
            };
            var resultAdd=await permissionModel.addForPermission(value);
            if(resultAdd.affectedRows!=0){
                response.message=`Update thanh cong .`;
            }else{
                response.message=`Update khong thanh cong . failed`;
            }
        }else{
            response.message=`Update khong thanh cong . failed`;
        }
      

        res.json(response);

    }

}