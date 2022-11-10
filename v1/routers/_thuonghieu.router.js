const thuonghieuModel = require("../models/thuonghieu.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    thuonghieuRouters:function(app){
        app.get(    LINK.CLIENT.THUONGHIEU_GET_LIST            ,this.setDefault,this.getListThuonghieu);
        app.get(    LINK.CLIENT.THUONGHIEU_GET_ALL             ,this.getAllList);
    },
   
    //lay danh sach 
    getListThuonghieu:async function(req,res,next){
        var condition={
            ten_th      :req.query.search,
            limit       :config.limitThuonghieu,
            offset      :(req.query.page-1)*config.limitThuonghieu
        };
        
        var result= await thuonghieuModel.getList(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //lay tất cả thuong hieu
    getAllList:async function(req,res,next){
        var result= await thuonghieuModel.getAll();
        res.json({
            status:200,
            data:result
        })
    }

}