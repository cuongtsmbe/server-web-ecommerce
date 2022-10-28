const config     = require("../config/default.json");
const orderModel = require("../models/order.model");
const LINK = require("../util/links.json");
module.exports = {
    orderRouters:function(app){
        app.get(    LINK.ADMIN.ORDER_GET_LIST                            ,this.setDefaultCustomerName,this.getListOrders);
        app.get(    LINK.ADMIN.ORDER_GET_ORDER_BY_CUSTOMER_ID            ,this.setDefaultCustomerId,this.getListOrders);
        app.get(    LINK.ADMIN.ORDER_GET_TOTALMONNEY_BY_CUSTOMER_ID      ,this.setDefaultCustomerId,this.getTotalMonneyOrders);
        app.get(    LINK.ADMIN.ORDER_GET_DETAILS                         ,this.getOrderDetails);
        app.put(    LINK.ADMIN.ORDER_UPDATE_STATUS                       ,this.updateStatus);
        app.post(   LINK.ADMIN.ORDER_CREATE                              ,this.checkDetailOrder,this.addNewOrder);
    },
    //set default name customer
    setDefaultCustomerName: function(req,res,next){
        res.locals.GetByName=true;
        if(req.query.tenkh==undefined){
            req.query.tenkh='';
        }
        if(req.query.page==undefined){
            req.query.page=1;
        }
        next();
    },
    //set default ID customer
    setDefaultCustomerId: function(req,res,next){
        res.locals.GetByName=false;
        if(req.query.page==undefined){
            req.query.page=1;
        }
        next();
    },
    //lay danh sach hoa don 
    getListOrders:async function(req,res,next){
        if(res.locals.GetByName==true){
            var condition={
                GetByName   :res.locals.GetByName,
                Ten_KH      :`%${req.query.tenkh}%`,     
                dateStart   :req.query.startdate,
                dateEnd     :req.query.enddate,
                trangThai   :req.query.trangthai,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };
        }else{
            var condition={
                GetByName   :res.locals.GetByName,
                ID_KH       :req.params.id,     
                dateStart   :req.query.startdate,
                dateEnd     :req.query.enddate,
                trangThai   :req.query.trangthai,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };
        }
        var result= await orderModel.getList(condition);

        res.json({
            status:200,
            data:result
        })
    },

    //get chi tiet hoa don : theo ID hoa don
    getOrderDetails:async function(req,res,next){
        var condition={
            id:req.params.id
        }
        var result=await orderModel.getDetails(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //cap nhat trang thai don hang
    updateStatus:async function(req,res,next){
        var response={
            status:201,
            message:""
        };

        var value={ trang_thai:req.body.Trang_thai  }
        var condition={ id:req.params.id    }
        var result=await orderModel.update(condition,value);

        if(result.changedRows==0){
            response.status=201;
            response.message="update khong thanh cong";
        }else{
            response.status=200;
            response.message="update thanh cong";
        }
        res.json(response);
    },
    //kiem tra input. Them hoa don
    checkDetailOrder:function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var empty=0;
        
        if(req.body.ID_KH==undefined    || req.body.ID_KH==""){empty=1;}
        if(req.body.Danh_sach_san_pham==undefined || req.body.Danh_sach_san_pham.length==0){empty=2;}
        if(req.body.Tong_tien==undefined    || req.body.Tong_tien.length==0){empty=1;}
        if(req.body.Trang_thai==undefined   || req.body.Trang_thai.length==0){empty=1;}
        if(req.body.ID_nhanvien==undefined  || req.body.ID_nhanvien.length==0){empty=1;}
        if(req.body.Ngay_tao==undefined     || req.body.Ngay_tao.length==0){empty=1;}
        if(empty==1){
            response.message="Thong tin khong day du.";
            res.json(response);
        }else if(empty==2){
            response.message="Thong tin san pham bi rong.";
            res.json(response);
        }else{
            next();
        }

    },

    //add new order
    //1. cover (product order detail) string json to json type
    //2.them hoa don 
    //3.them chi tiet hoa don
    addNewOrder:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        //1
        var arrProduct=JSON.parse(req.body.Danh_sach_san_pham);
        //2
        var valueHD={
            id:                     Date.now(),//id order by milliseconds 
            id_khachhang:           req.body.ID_KH,
            tong_tien:              req.body.Tong_tien,
            ngay_tao:               req.body.Ngay_tao,
            id_nhanvien:            req.body.ID_nhanvien,
            trang_thai:             req.body.Trang_thai,
            phuong_thuc_thanh_toan: req.body.phuong_thuc_thanh_toan===undefined ? 1 : req.body.phuong_thuc_thanh_toan 
        }
        var resultCreateHD=await orderModel.addOrder(valueHD);
        
        if(resultCreateHD.affectedRows==0){
            response.message="Create don hang khong thanh cong.";
        }else{
            //3
            var valueChiTiet={
                Danh_sach_san_pham:     arrProduct,
                id_hoadon:              valueHD.id       
            };
            var resultCreateDetailsOrder=await orderModel.addOrderDetails(valueChiTiet);

            // length == 0 error sql thì load return []
            // affectedRows khi đã chạy vô insert thành công 
            if(resultCreateDetailsOrder.length==0 || resultCreateDetailsOrder.affectedRows==0){
                //xóa đơn hàng fail
                await orderModel.deleteHDByID({id:valueHD.id});

                response.message="Create don hang khong thanh cong.";
            }else{
                response.message="Create order success.";
            }
        }
        res.json(response);
    },
    //get total monney orders of customer by ID
    getTotalMonneyOrders:async function(req,res,next){
        var condition={
            ID_KH       :req.params.id,     
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai
        };
        
        var result=await orderModel.getTotalMonneyByIdCustomer(condition);
        res.json({
            status:200,
            data:result
        });

    }
}