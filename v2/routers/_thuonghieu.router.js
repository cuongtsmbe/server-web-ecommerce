const thuonghieuModel = require("../models/thuonghieu.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    thuonghieuClientRouters:function(app){
        app.get(    LINK.CLIENT.THUONGHIEU_GET_LIST            ,this.setDefault,this.getListThuonghieu);
        app.get(    LINK.CLIENT.THUONGHIEU_GET_ALL             ,this.getAllList);
    },
    setDefault:function(req,res,next){
        if(req.query.search==undefined){
            req.query.search='';
        }
        if(req.query.page==undefined || req.query.page<=0){
            req.query.page=1;
        }
        next();
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
        var redisClientService=res.locals.redisClientService;

        var lsthuonghieu = await redisClientService.jsonGet(`thuonghieu:all`);
        
        if(!lsthuonghieu){
           
            lsthuonghieu= await thuonghieuModel.getAll();
            await redisClientService.jsonSet(`thuonghieu:all`,".",JSON.stringify(lsthuonghieu));
        
        }else{
            
            lsthuonghieu = JSON.parse(lsthuonghieu);
        }
       
        res.json({
            status:200,
            data:lsthuonghieu
        })
    }

}