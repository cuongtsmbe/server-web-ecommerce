const config     = require("../config/default.json");
const phieuNhapModel = require("../models/phieunhap.model");
const supplierModel =require("../models/supplier.model");
const LINK = require("../util/links.json");
module.exports = {
    PhieuNhapRouters:function(app){
        app.get(   "/admin/phieunhap/list/:id"                          ,this.setDefaultPage,this.setDefaultTrangThai,this.ListPhieuNhapByIDNCC);
        app.get(   "/admin/phieunhap/Condition/time"                         ,this.setDefaultPage,this.setDefaultTrangThai,this.ListPhieuNhapByTime);
        app.get(    "/admin/phieunhap/totalMoney"               ,this.setDefaultTrangThai,this.getToTalMonneyByTime);
        app.put(   "/admin/phieunhap/updateStatus/:id"                  ,this.updateStatus);
    },
    setDefaultPage: function(req,res,next){
        if(req.query.page==undefined||req.query.page==null||req.query.page<=0){
            req.query.page=1;
        }
        next();
    },
    setDefaultTrangThai: function(req,res,next){
           
        if(req.query.trangthai===undefined || req.query.trangthai=='' || isNaN( req.query.trangthai)){
            req.query.trangthai=-1;
        }
        next();
    },
    //lay danh sach phieu nhap (have limit) 
    ListPhieuNhapByIDNCC:async function(req,res,next){
        var condition={
            ID_NCC      :req.params.id,
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai,
            limit       :config.limitPhieuNhap,
            offset      :(req.query.page-1)*config.limitPhieuNhap
        };
        var [NCC,data]=await Promise.all([
            supplierModel.getOneByID({id:condition.ID_NCC}),
            phieuNhapModel.GetListByIDNCC(condition),
           ]);
        res.json({
            status:200,
            NCC,
            data
        })
    },
    //lay danh sach phieu nhap trong khoảng thời gian
   
    ListPhieuNhapByTime:async function(req,res,next){
        var condition={
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai,
            limit       :config.limitPhieuNhap,
            offset      :(req.query.page-1)*config.limitPhieuNhap
        };
        var data=await phieuNhapModel.GetListByTime(condition);
         //sai truy van join inner  day phay hay gi do
        res.json({
            status:200,
            data
        })
    },
    //cap nhat trang thai phieu nhap
    updateStatus:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var value={ trangthai:Number(req.body.Trang_thai)  }
        var condition={ id:req.params.id    }

        if (req.body.Trang_thai===undefined || req.body.Trang_thai === null || isNaN(value.trangthai) || req.body.Trang_thai=='') {
            return res.json({
                status:404,
                message:"Error 'trang thai' not integer type."
            });
        }
       
        var result=await phieuNhapModel.update(condition,value);

        if(result.changedRows==0){
            response.status=201;
            response.message="update khong thanh cong.";
        }else{
            response.status=200;
            response.message="update thanh cong";
        }
        res.json(response);
    },
    //lay tong tien đã nhập trong khoảng thời gian
    getToTalMonneyByTime:async function(req,res,next){
        var condition={
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai
        };
        
        var result=await phieuNhapModel.getTotalMonneyByTime(condition);

        res.json({
            status:200,
            data:result
        });

    }
}