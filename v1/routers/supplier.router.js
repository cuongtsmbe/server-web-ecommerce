const supplierModel = require("../models/supplier.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    supplierRouters:function(app){
        app.get(    LINK.ADMIN.SUPPLIER_GET_LIST        ,this.setDefault , this.get);
        app.get(    LINK.ADMIN.SUPPLIER_GET_BY_ID       ,this.getSupplierByID);
        app.post(   LINK.ADMIN.SUPPLIER_ADD             ,this.add);
        app.put(    LINK.ADMIN.SUPPLIER_EDIT            ,this.update);
        app.delete( LINK.ADMIN.SUPPLIER_DELETE          ,this.delete);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.ten_ncc==undefined){
            req.query.ten_ncc=``;
        }
        if(req.query.page==undefined || req.query.page<=0){
            req.query.page=1;
        }
        next();
    },
    //lay danh sach nha cung cap
    get:async function(req,res,next){
       
        var condition={
            limit:config.limitSuppliers,
            ten_ncc:`%${req.query.ten_ncc}%`,
            offset:config.limitSuppliers*(req.query.page-1)
        };
        var result= await supplierModel.get(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //lay nha cung cap theo ID 
    getSupplierByID:async function(req,res,next){
        var condition={
           id:req.params.id
        };
        var result= await supplierModel.getOneByID(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //them moi nha cung cap
    add:async function(req,res,next){
        var value={
            ten_ncc :req.body.Ten_nha_cung_cap,
            diachi  :req.body.Dia_chi,
            email   :req.body.Email,
            website :req.body.Website,
            logo    :req.body.Logo_url,
            phone   :req.body.Phone
        };
        var result=await supplierModel.add(value);
       
        if(result.affectedRows==0){
            res.json({
                        status:500,
                        message:"Them khong thanh cong"
                    })
        }else{
            res.json({
                        status:200,
                        message:"Them thanh cong"
                    })
        }
    },
    //update thong tin nha cung cap
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value={
            ten_ncc :req.body.Ten_nha_cung_cap,
            diachi  :req.body.Dia_chi,
            email   :req.body.Email,
            website :req.body.Website,
            logo    :req.body.Logo_url,
            phone   :req.body.Phone
            
        };
        var result=await supplierModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=500;
            response.message="update khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thanh cong";  
        }
        res.json(response);
    },
    //delete nha cung cap theo id
    delete:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var result=await supplierModel.update(condition,{trangthai:-2});
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