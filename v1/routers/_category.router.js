const categoryModel = require("../models/category.model");
const LINK = require("../util/links.json");
module.exports = {
    categoryClientRouters:function(app){
        app.get(LINK.CLIENT.CATEGORY_GET_LIST          ,this.getAllCategory);
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
}