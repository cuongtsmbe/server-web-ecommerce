const categoryModel = require("../models/category.model");
const LINK = require("../util/links.json");
module.exports = {
    categoryClientRouters:function(app){
        app.get(LINK.CLIENT.CATEGORY_GET_LIST          ,this.getAllCategory);
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
}