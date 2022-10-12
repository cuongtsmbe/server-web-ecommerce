const productModel = require("../models/product.model");
const supplierModel=require("../models/supplier.model");
const categoryModel=require("../models/category.model");
const config     = require("../config/default.json");
module.exports = {
    productRoutersClient:function(app){
        app.get('/product/list'      ,this.setDefault,this.get);
        app.get('/product/details/:id',this.getOneByID);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.page==undefined){
            req.query.page=1;
        }
        if(req.query.tensp==undefined){
            req.query.tensp='';
        }
        if(req.query.idtheloai==undefined){
            req.query.idtheloai=-1;
        }
        if(req.query.idthuonghieu==undefined){
            req.query.idthuonghieu=-1;
        }
        if(req.query.manHinh==undefined){
            req.query.manHinh='';
        }
        if(req.query.cpu==undefined){
            req.query.cpu='';
        }
        if(req.query.ram==undefined){
            req.query.ram='';
        }
        if(req.query.card==undefined){
            req.query.card='';
        }
        if(req.query.oCung==undefined){
            req.query.oCung='';
        }
        if(req.query.price_start==undefined){
            req.query.price_start=0;
        }
        if(req.query.price_end==undefined){
            req.query.price_end=config.MAX;
        }
        
        next();
    },
    //lay danh sach sản phẩm có điều kiện kèm theo
    get:async function(req,res,next){
        var condition={
            limit:          config.limitProductsClient,
            offset:         config.limitProductsClient*(req.query.page-1),
            tensp:          req.query.tensp,
            idtheloai:      req.query.idtheloai,
            idthuonghieu:   req.query.idthuonghieu,
            manHinh:        req.query.manHinh,
            cpu:            req.query.cpu,
            ram:            req.query.ram,
            card:           req.query.card,
            oCung:          req.query.oCung,
            price_start:    req.query.price_start,
            price_end:      req.query.price_end
        };
        var result= await productModel.getListByCondition(condition);
        res.json({
            status:200,
            total:result.length,
            data:result
        })
    },
  
    //xem chi tiet mot san pham theo ID 
    getOneByID:async function(req,res,next){
        var condition={
            id:req.params.id
        };
        var detailProduct=await productModel.getOneByID(condition);
        res.json({
            status:200,
            data:detailProduct
        });
    }
};