const config     = require("../config/default.json");
const phieuNhapModel = require("../models/phieunhap.model");
const supplierModel =require("../models/supplier.model");
const LINK = require("../util/links.json");
const productModel = require("../models/product.model");

module.exports = {
    PhieuNhapRouters:function(app){
        app.get(   LINK.ADMIN.PHIEUNHAP_GET_LIST_BY_IDNCC            ,this.setDefaultPage,this.setDefaultTrangThai,this.ListPhieuNhapByIDNCC);
        app.get(   LINK.ADMIN.PHIEUNHAP_GET_DETAILS_BY_ID            ,this.getDetailsPhieuNhapByID);
        app.get(   LINK.ADMIN.PHIEUNHAP_GET_LIST_BY_TIME             ,this.setDefaultPage,this.setDefaultTrangThai,this.ListPhieuNhapByTime);
        app.get(   LINK.ADMIN.PHIEUNHAP_GET_TOTALMONEY_BY_TIME       ,this.setDefaultTrangThai,this.getToTalMonneyByTime);
        app.post(  LINK.ADMIN.PHIEUNHAP_CREATE                       ,this.addPhieuNhap);
        app.put(   LINK.ADMIN.PHIEUNHAP_UPDATESTATUS_BY_ID           ,this.updateStatus);
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
       
        var [NCC,data,countResult]=await Promise.all([
            supplierModel.getOneByID({id:condition.ID_NCC}),
            phieuNhapModel.GetListByIDNCC(condition),
            phieuNhapModel.GetListByIDNCC(condition,1),
           ]);

        res.json({
            status:200,
            NCC,
            data,
            countPNNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
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
        
        var [data,countResult]=await Promise.all([
            phieuNhapModel.GetListByTime(condition),
            phieuNhapModel.GetListByTime(condition,1),
       ]);

        res.json({
            status:200,
            data,
            countPNNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
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
    },
    //xem chi tiết phiếu nhập theo ID phiếu nhâp
    getDetailsPhieuNhapByID:async function(req,res,next){
           
        var IDPhieuNhap=req.params.id;

        var condition={
            IDPhieuNhap
        };

        var phieunhap=await phieuNhapModel.getPhieuNhapByID(condition);

        if(phieunhap.length==0){
            return res.json({
                status:401,
                message:`Khong tim thay phieu nhap theo id ${condition.IDPhieuNhap}`
            });
        }
        var CTPN=await phieuNhapModel.getProductInCTPN(condition);
        
        res.json({
            status:200,
            phieunhap:phieunhap[0],
            CTPN
        });
    },
    //create phiêu nhập 
    //1 cover string to json
    //2 add to table phieunhap
    //3 add to ctphieunhap
    addPhieuNhap:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var response={
            status:201,
            message:""
        };
        //1
        var arrProduct=JSON.parse(req.body.Danh_sach_san_pham);
        //2
        var valuePN={
            id              :         Date.now(),//id phieu nhap by milliseconds 
            id_ncc          :         req.body.id_ncc,
            id_nv           :         req.body.id_nv,
            tong_tien       :         req.body.Tong_tien,
            ngay_tao        :         req.body.Ngay_tao,
            trangthai       :         req.body.Trang_thai,
            ghichu          :         req.body.Ghi_chu
        }
        var resultCreatePN=await phieuNhapModel.addPhieuNhap(valuePN);

        if(resultCreatePN.affectedRows==0){
            response.status=501;
            response.message="Create phieu nhap khong thanh cong.";
        }else{
            //3
            var valueChiTiet={
                Danh_sach_san_pham  :     arrProduct,
                id_phieunhap        :     valuePN.id       
            };
            var result=await phieuNhapModel.addPhieuNhapDetails(valueChiTiet);

            //result.length ==0 là khi insert không được(lỗi truy vấn VD:khóa ngoại ) -> load function return []
            //result.affectedRows do insert query trả về object

            if(result.length==0 || result.affectedRows==0){
                //4. delete phieu nhap nếu . thêm chi tiết phiếu nhập không thành công
                await phieuNhapModel.deletePNByID({id:valuePN.id});
                response.status=502;
                response.message="Create PN fail. Lưu ý có thể:  sai thong tin danh sach san pham.";
                
            }else{
                //5.tăng số lượng sản phẩm trong kho
                var valueChiTiet={
                    Danh_sach_san_pham:     arrProduct      
                };
                var resultUpdate= await productModel.updateSoluong(valueChiTiet,'INS',redisClientService);
                //có 1 sản phẩm sai ID 
                if(404==resultUpdate.status){
                    return res.json(resultUpdate);
                }
                response.message="Create order success.";
            }
        }
        res.json(response);
    }

}