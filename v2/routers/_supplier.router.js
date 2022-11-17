const supplierModel = require("../models/supplier.model");
const LINK = require("../util/links.json");
module.exports = {
    supplierRouters:function(app){
        app.get(    LINK.CLIENT.SUPPLIER_GET_BY_ID       , this.getSupplierByID);
    },
    //lay nha cung cap theo ID 
    getSupplierByID:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var condition={
            id:req.params.id
        };

        var result = await redisClientService.jsonGet(`supplier:${condition.id}`);

        if(!result){
           
            result= await supplierModel.getOneByID(condition);
            await redisClientService.jsonSet(`supplier:${condition.id}`,".",JSON.stringify(result));
        
        }else{

            result = JSON.parse(result);
            
        }      

        res.json({
            status:200,
            data:result
        })
    },
}


