const supplierModel = require("../models/supplier.model");
const LINK = require("../util/links.json");
module.exports = {
    supplierRouters:function(app){
        app.get(    LINK.CLIENT.SUPPLIER_GET_BY_ID       , this.getSupplierByID);
    },
    //lay nha cung cap theo ID 
    getSupplierByID:async function(req,res,next){
        var condition={
        id:req.params.id
        };
        var result= await supplierModel.getOneByID(condition);
        res.json({
            status:200,
            data:result
        })
    },
}


