const categoryModel = require("../models/category.model");
const LINK = require("../util/links.json");
module.exports = {
    categoryClientRouters:function(app){
        app.get(LINK.CLIENT.CATEGORY_GET_LIST          ,this.getAllCategory);
        app.get(LINK.CLIENT.CATEGORY_GET_BY_ID         ,this.getCategoryByID);
    },
    //lay danh sach the loai
    getAllCategory:async function(req,res,next){
        var result= await categoryModel.getAll();
        res.json({
            status:200,
            total:result.length,
            data:result
        })
    },
    //lay the loai theo id 
    getCategoryByID:async function(req,res,next){
        var condition={
            id:req.params.id
        };
        var result= await categoryModel.getOneByID(condition);
        res.json({
            status:200,
            data:result
        })
    },
}