const thuonghieuModel = require("../models/thuonghieu.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    thuonghieuRouters:function(app){
        app.get(    LINK.ADMIN.THUONGHIEU_GET_LIST            ,this.setDefault,this.getListThuonghieu);
        app.get(    LINK.ADMIN.THUONGHIEU_GET_ALL             ,this.getAllList);
        app.get(    LINK.ADMIN.THUONGHIEU_GET_BY_ID           ,this.getThuongHieuByID);
        app.post(   LINK.ADMIN.THUONGHIEU_ADD                 ,this.add);
        app.put(    LINK.ADMIN.THUONGHIEU_EDIT                ,this.update);
        app.delete( LINK.ADMIN.THUONGHIEU_DELETE              ,this.delete);
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
    //lay danh sach 
    getListThuonghieu:async function(req,res,next){
        var condition={
            ten_th      :req.query.search,
            limit       :config.limitThuonghieu,
            offset      :(req.query.page-1)*config.limitThuonghieu
        };

        var [data,countResult]=await Promise.all([
            thuonghieuModel.getList(condition),
            thuonghieuModel.getList(condition,1),
           ]);

        res.json({
            status:200,
            data,
            countNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
        }) 
    },
    //lay tất cả thuong hieu
    getAllList:async function(req,res,next){
        var result= await thuonghieuModel.getAll();
        res.json({
            status:200,
            data:result
        })
    },
    //lay thuong hieu theo id 
    getThuongHieuByID:async function(req,res,next){
        var condition={
           id:req.params.id
        };
        
        var result= await thuonghieuModel.getOneByID(condition);
        
        res.json({
            status:200,
            data:result
        })
    },
    //them thuong hieu
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        if(req.body.Ten_thuong_hieu==undefined || req.body.Ten_thuong_hieu==''){
            response.status=203;
            response.message="Ten thuong hieu empty";
            return res.json(response);
        }
        var value={
            ten_th:req.body.Ten_thuong_hieu
        };
        var result=await thuonghieuModel.add(value);
        if(result.affectedRows!=0){
            response.status=200;
            response.message=`Them thuong hieu thanh cong . insertId: ${result.insertId}`;
        }else{
            response.status=201;
            response.message=`Them thuong hieu khong thanh cong . failed`;
        }
        res.json(response);

    },
    //edit ten thuong hieu
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };

        if(req.body.Ten_thuong_hieu==undefined || req.body.Ten_thuong_hieu==''){
            response.status=203;
            response.message="Ten thuong hieu empty";
            return res.json(response);
        }

        var value={
            ten_th :req.body.Ten_thuong_hieu,
        };

        var result=await thuonghieuModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=201;
            response.message="update khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thanh cong";  
        }
        res.json(response);
    },
    //delete 
    delete:async function(req,res,next){
            var response={
                status:201,
                message:""
            };
            var condition={
                id:req.params.id
            };
            var result=await thuonghieuModel.update(condition,{trangthai:-2});
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