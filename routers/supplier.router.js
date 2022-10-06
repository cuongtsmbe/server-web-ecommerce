const supplierModel = require("../models/supplier.model");
const config     = require("../config/default.json");
module.exports = {
    supplierRouters:function(app){
        app.get('/admin/supplier',this.getListSupplier);
        
    },

    //lay danh sach nha cung cap
    getListSupplier:async function(req,res,next){
        var condition={
            limit:config.limitSuppliers
        };
        var result= await supplierModel.getSupplier(condition);
        
        res.json({
            status:200,
            data:result
        })
    },
}