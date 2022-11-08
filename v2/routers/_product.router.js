const productModel = require("../models/product.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    productRoutersClient:function(app){
        app.get(LINK.CLIENT.PRODUCT_GET_LIST                        ,this.setDefault,this.get);
        app.get(LINK.CLIENT.PRODUCT_GET_DETAILS                     ,this.getOneByID);
        app.get(LINK.CLIENT.PRODUCT_GET_LIST_TOPSALE_BY_THELOAI     ,this.getListTopSaleByTheloai);
        app.get(LINK.CLIENT.PRODUCT_GET_LIST_RELEVANT               ,this.getListProductRelevant);
        app.get(LINK.CLIENT.PRODUCT_GET_LIST_TOPSALE_MOST           ,this.getListMostTopSale);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.page==undefined || req.query.page<=0){
            req.query.page=1;
        }
        if(req.query.tensp==undefined){
            req.query.tensp='';
        }
        if(req.query.idtheloai==undefined){
            req.query.idtheloai=-1;
        }
        if(req.query.idthuonghieu==undefined){
            req.query.idthuonghieu=[];
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
        //-1 : không sort
        // 0 : sort bán chay
        // 1 : giá cao -> thấp 
        // 2 : giá thấp -> cao
        if(req.query.sort==undefined){
            req.query.sort=-1;
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
            price_end:      req.query.price_end,
            sort:           req.query.sort
        };

        
        var [countProducts,result]=await Promise.all([
            productModel.CountListByCondition(condition),
            productModel.getListByCondition(condition)
           ]);

        res.json({
            status:200,
            datalength:result.length,
            data:result,
            countProductsNoLimit:countProducts[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countProducts[0].count/condition.limit)
        })
    },
  
    //xem chi tiet mot san pham theo ID 
    getOneByID:async function(req,res,next){
        var redisClientService=res.locals.redisClientService
        var condition={
            id:req.params.id
        };

        var detailProduct = await redisClientService.jsonGet(`product:${condition.id}`);
        
        if(!detailProduct){
           
            detailProduct=await productModel.getOneByID(condition);
            await redisClientService.jsonSet(`product:${condition.id}`,".",JSON.stringify(detailProduct));
        
        }else{
            
            detailProduct = JSON.parse(detailProduct);
        }
       
        res.json({
            status:200,
            data:detailProduct
        });
    },
    //lấy sản phẩm bán chạy nhất theo thể loại 
    getListTopSaleByTheloai:async function(req,res,next){
        var redisClientService=res.locals.redisClientService

        var condition={
            idtheloai:Number(req.params.idtheloai),
            limitTopSale:Number(req.params.limit)
        }

        if (isNaN(condition.idtheloai) || isNaN(condition.limitTopSale)) {
            return res.json({
                status:404,
                message:"id thể loại và limit phải là number ."
            });
        
        }
        if(condition.limitTopSale>=config.limitProductTopSale){
            return res.json({
                status:404,
                message:`limit < ${config.limitProductTopSale} .`
            });
        }

        var result = await redisClientService.jsonGet(`ListTopSaleByTheLoai:${condition.idtheloai}`);
        
        if(!result){
           
            var result= await productModel.getListTopSale(condition);
            await redisClientService.jsonSet(`ListTopSaleByTheLoai:${condition.idtheloai}`,".",JSON.stringify(result));
        
        }else{
        
            result = JSON.parse(result);
        }        

        res.json({
            status:200,
            total:result.length,
            data:result
        })

    },
    //lấy danh sách sản phẩm có liên quan với id product.
    getListProductRelevant:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var condition={
            idtheloai:Number(req.params.idtheloai),
            limit:Number(req.params.limit),
            IDProduct:Number(req.params.idProduct),
        }

        if (isNaN(condition.idtheloai) || isNaN(condition.limit) || isNaN(condition.IDProduct)) {
            return res.json({
                status:404,
                message:"id thể loại và limit và IDProduct phải là number ."
            });
        
        }
        if(condition.limit>=config.limitProductRelevant){
            return res.json({
                status:404,
                message:`limit < ${config.limitProductRelevant} .`
            });
        }
        var result = await redisClientService.jsonGet(`product:Relevant:${condition.IDProduct}`);
        
        if(!result){
           
            var result = await productModel.getListRelevant(condition);
            await redisClientService.jsonSet(`product:Relevant:${condition.IDProduct}`,".",JSON.stringify(result));
        
        }else{
        
            result = JSON.parse(result);
        }
       
        res.json({
            status:200,
            total:result.length,
            data:result
        })

    },
    //lấy danh sách sản phẩm bán chạy nhất 
    getListMostTopSale:async function(req,res,next){
        var redisClientService=res.locals.redisClientService

        var condition={
            idtheloai:null,
            limitTopSale:Number(req.params.limit)
        }

        if (isNaN(condition.limitTopSale)) {
            return res.json({
                status:404,
                message:"limit phải là number ."
            });
        
        }
        if(condition.limitTopSale>=config.limitProductTopSale){
            return res.json({
                status:404,
                message:`limit < ${config.limitProductTopSale} .`
            });
        }
       

        var result = await redisClientService.jsonGet(`ListTopSaleProducts`);
        
        if(!result){
           
            var result= await productModel.getListTopSale(condition);
            await redisClientService.jsonSet(`ListTopSaleProducts`,".",JSON.stringify(result));
        
        }else{
        
            result = JSON.parse(result);
        }        


        res.json({
            status:200,
            total:result.length,
            data:result
        })
    }

};