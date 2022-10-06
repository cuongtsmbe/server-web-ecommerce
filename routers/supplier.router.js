const supplierModel = require("../models/supplier.model");
const config     = require("../config/default.json");
module.exports = {
    supplierRouters:function(app){
        app.get('/admin/supplier/view'      ,this.get);
        app.post('/admin/supplier/add'      ,this.add);
        app.put('/admin/supplier/edit/:id'  ,this.update);
        app.delete('/admin/supplier/delete/:id',this.delete);
    },

    //lay danh sach nha cung cap
    get:async function(req,res,next){
        if(req.query.ten_ncc==undefined){
            req.query.ten_ncc=``;
        }
        var condition={
            limit:config.limitSuppliers,
            ten_ncc:`%${req.query.ten_ncc}%`,
            page:req.query.page
        };
        var result= await supplierModel.get(condition);
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
        if(req.params.id==undefined) next();
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
            res.json({
                        status:500,
                        message:"update khong thanh cong"
                    })
        }else{
            res.json({
                        status:200,
                        message:"update thanh cong"
                    })
        }
    },
    //delete nha cung cap theo id
    delete:async function(req,res,next){
        if(req.params.id==undefined) next();
        var condition={
            id:req.params.id
        };
        var result=await supplierModel.delete(condition);
        if(result.affectedRows==0){
            res.json({
                        status:500,
                        message:"delete khong thanh cong"
                    })
        }else{
            res.json({
                        status:200,
                        message:"delete thanh cong"
                    })
        }
    }
}