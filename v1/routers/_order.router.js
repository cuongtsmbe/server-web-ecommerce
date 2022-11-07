const config     = require("../config/default.json");
const orderModel = require("../models/order.model");
const LINK = require("../util/links.json");
module.exports = {
    orderRoutersClient:function(app){
        app.get( LINK.CLIENT.ORDER_GET_HISTORY                  ,this.setDefaultPage,this.getListOrders);
        app.get( LINK.CLIENT.ORDER_GET_TOTALMONNEY              ,this.getTotalMonneyOrders);
        app.get( LINK.CLIENT.ORDER_GET_DETAILS                  ,this.getOrderDetails);
        app.get( LINK.CLIENT.ORDER_LIST_ID_PRODUCT              ,this.getProductInOrderDetails);
        app.post(LINK.CLIENT.ORDER_THANHTOAN                    ,this.ThanhToan);
        app.put( LINK.CLIENT.ORDER_CHANGE_STATUS                ,this.changeStatusOrder);
    },
    //set default page
    setDefaultPage: function(req,res,next){
        res.locals.GetByName=false;
        if(req.query.page==undefined || req.query.page<=0){
            req.query.page=1;
        }
        next();
    },
    //lay danh sach hoa don va tong tien khach da chi
    getListOrders:async function(req,res,next){
            var condition={
                GetByName   :res.locals.GetByName,
                ID_KH       :req.user.id,     
                dateStart   :req.query.startdate,
                dateEnd     :req.query.enddate,
                trangThai   :req.query.trangthai ? req.query.trangthai : -1,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };
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

    //get danh sach id san pham trong chi tiết đơn hàng 
    getProductInOrderDetails:async function(req,res,next){
        var condition={
            id_hoadon:req.params.idhoadon
        }
        var result=await orderModel.getproductsInDetail(condition);
        res.json({
            status:200,
            data:result
        })
    },

    //get total monney orders of customer by ID
    getTotalMonneyOrders:async function(req,res,next){
        var condition={
            ID_KH       :req.user.id,     
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai
        };
        var result=await orderModel.getTotalMonneyByIdCustomer(condition);
        res.json({
            status:200,
            data:result
        });

    },

    //add new order
    //1. product order detail
    //2.them hoa don 
    //3.them chi tiet hoa don
    ThanhToan:async function(req,res,next){

        if(req.session.cart===undefined || req.session.cart.totalItems==0){
            return res.json({
                status:400,
                message:"Cart empty."
            });
        }
        var response={
            status:201,
            message:""
        };
        //1
        var productsInCart = [];
        Object.entries(req.session.cart.items).forEach(entry => {
            const [key, value] = entry;
            productsInCart.push({
                id_san_pham: key,
                Price: value.item.don_gia,
                So_luong: value.quantity
            });
        });

        
        //2
        var valueHD={
            id:                     Date.now(),//id order by milliseconds 
            id_khachhang:           req.user.id,
            tong_tien:              req.session.cart.totalPrice,
            id_nhanvien:            null,
            trang_thai:             1, //trang thái đơn hàng vừa được tạo    
            phuong_thuc_thanh_toan: req.body.phuong_thuc_thanh_toan===undefined ? 1 : req.body.phuong_thuc_thanh_toan
        };
  
        
        var resultCreateHD=await orderModel.addOrder(valueHD);
        if(resultCreateHD.affectedRows==0){
            response.status=500;
            response.message="Tao don hang khong thanh cong.";
        }else{
            //3
            var valueChiTiet={
                Danh_sach_san_pham:     productsInCart,
                id_hoadon:              valueHD.id       
            };
            var resultCreateDetailsOrder=await orderModel.addOrderDetails(valueChiTiet);
            if(resultCreateDetailsOrder.affectedRows==0){
                response.status=500;
                response.message="Tao don hang khong thanh cong.";
            }else{
                response.message="Create order success.";
            }
        }
        //xóa giỏ hàng 
        delete req.session.cart;

        res.json(response);
    },
     //cap nhat trang thai don hang
    changeStatusOrder:async function(req,res,next){
        var response={
            status:201,
            message:""
        };

        var value={ trang_thai:req.body.Trang_thai  }
        var condition={ id:req.params.id    }

        var details = await orderModel.getOrderByID(condition);

        if(details.length==0 || details[0].trang_thai!=1){
            return res.json({
                status:202,
                message:"ID hoa don khong dung OR trang thai don hang khong the Update."
            });
        }

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
}