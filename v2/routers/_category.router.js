const categoryModel = require("../models/category.model");
const LINK = require("../util/links.json");
module.exports = {
    categoryClientRouters:function(app){
        app.get(LINK.CLIENT.CATEGORY_GET_LIST          ,this.getAllCategory);
        app.get(LINK.CLIENT.CATEGORY_GET_BY_ID         ,this.getCategoryByID);
    },
    //lay danh sach the loai
    getAllCategory:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var result = await redisClientService.jsonGet(`getAllCategory`);

        if(!result){
           
            result= await categoryModel.getAll();
            await redisClientService.jsonSet(`getAllCategory`,".",JSON.stringify(result));
        
        }else{

            result = JSON.parse(result);
            
        }      

        res.json({
            status:200,
            total:result.length,
            data:result
        })
    },
    //lay the loai theo id 
    getCategoryByID:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var condition={
            id:req.params.id
        };

        var result = await redisClientService.jsonGet(`category:${condition.id}`);

        if(!result){
           
            result= await categoryModel.getOneByID(condition);
            await redisClientService.jsonSet(`category:${condition.id}`,".",JSON.stringify(result));
        
        }else{

            result = JSON.parse(result);
            
        }      

        res.json({
            status:200,
            data:result
        })
    },
}