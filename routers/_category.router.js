const categoryModel = require("../models/category.model");
module.exports = {
    categoryClientRouters:function(app){
        app.get('/listcategories'          ,this.getAllCategory);
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