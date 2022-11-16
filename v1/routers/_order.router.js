const config     = require("../config/default.json");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const sendMail = require("../mdw/sendMail.mdw");
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
        var result=await orderModel.getIdProductsInDetail(condition);
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
            // length == 0 error sql thì load return []
            // affectedRows khi đã chạy vô insert thành công 

            if(resultCreateDetailsOrder.length==0 || resultCreateDetailsOrder.affectedRows==0){
                //xóa đơn hàng fail
                await orderModel.deleteHDByID({id:valueChiTiet.id_hoadon});
                
                response.status=500;
                response.message="Tao don hang khong thanh cong.";
            }else{
                //giảm số lượng sản phẩm trong kho
                var orderChiTiet={
                    Danh_sach_san_pham:     valueChiTiet.Danh_sach_san_pham      
                };
                var resultUpdate= await productModel.updateSoluong(orderChiTiet,'DES');
                //có 1 sản phẩm sai ID || không đủ hàng
                if(404==resultUpdate.status){
                    //xóa đơn hàng fail
                    await orderModel.deleteHDByID({id:valueChiTiet.id_hoadon});
                    return res.json(resultUpdate);
                }
                response.message="Create order success.";
                
                //xóa giỏ hàng 
                delete req.session.cart;  

                //gửi bill qua email 
                sendMail.SendMailBillOrder(valueChiTiet.id_hoadon);

            }

        }
        

        res.json(response);
    },
     //cap nhat trang thai don hang (hủy đơn)
    changeStatusOrder:async function(req,res,next){
        var response={
            status:201,
            message:""
        };

        var value={ trang_thai:0  }
        var condition={ id:req.params.id    }

        var details = await orderModel.getOrderByID(condition);

        //trang thai đơn đã duyệt. OR đơn hàng không phải của tài khoản login 

        if(details.length==0 || details[0].trang_thai!=1 || details[0].id_khachhang!=req.user.id){
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
            
            //hủy đơn . trả lại số lượng sản phẩm trong kho

            if(value.trang_thai==0){
                
                //tăng số lượng sản phẩm trong kho
                 var arrProduct = await orderModel.getproductsInDetail({id_hoadon:condition.id});
                 
                 var valueChiTiet={
                    Danh_sach_san_pham:     arrProduct      
                };

                var resultUpdate= await productModel.updateSoluong(valueChiTiet,'HUYDON');
                //có 1 sản phẩm sai ID 
                if(404==resultUpdate.status){
                    return res.json(resultUpdate);
                }
                response.message="hủy đơn thành công";
            }


        }
        res.json(response);
    },
}