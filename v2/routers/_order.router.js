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
        if(req.query.sort==undefined){
            req.query.sort=-1;
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
                sort        :req.query.sort,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };

        var [result,countResult]=await Promise.all([
            await orderModel.getList(condition),
            await orderModel.getList(condition,1)
           ]);
        res.json({
            status:200,
            data:result,
            countOrdersNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
        })
    },

    //get chi tiet hoa don : theo ID hoa don
    getOrderDetails:async function(req,res,next){

        var redisClientService=res.locals.redisClientService;

        var condition={
            id:req.params.id
        }
        var orderdetails = await redisClientService.jsonGet(`getOrderDetails:${condition.id}`);

        if(!orderdetails){
            
            orderdetails= await orderModel.getDetails(condition);
            await redisClientService.jsonSet(`getOrderDetails:${condition.id}`,".",JSON.stringify(orderdetails));
        
        }else{
            
            orderdetails = JSON.parse(orderdetails);

        }
        res.json({
            status:200,
            data:orderdetails
        })
    },

    //get danh sach id san pham trong chi tiết đơn hàng 
    getProductInOrderDetails:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var condition={
            id_hoadon:req.params.idhoadon
        }

        var result = await redisClientService.jsonGet(`getProductInOrderDetails:${condition.id_hoadon}`);
        
        if(!result){
           
            result=await orderModel.getproductsInDetail(condition);
            await redisClientService.jsonSet(`getProductInOrderDetails:${condition.id_hoadon}`,".",JSON.stringify(result));
        
        }else{
       
            result = JSON.parse(result);
        
        }
        
       
        res.json({
            status:200,
            data:result
        })
    },

    //get total monney orders of customer by ID
    getTotalMonneyOrders:async function(req,res,next){
        if(req.query.trangthai==undefined){
            req.query.trangthai=-1;
        }
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
        var redisClientService=res.locals.redisClientService;
        //get cart in redis
        var cartredis = await redisClientService.jsonGet(`cart:${req.user.id}`);

        if(!cartredis){
            return res.json({
                status:400,
                message:"Cart empty."
            });
        }else{
            cartredis=JSON.parse(cartredis);
            if(cartredis.totalItems==0){
                return res.json({
                    status:400,
                    message:"Cart empty."
                }); 
            }
        }

        var response={
            status:201,
            message:""
        };
        //1
        var productsInCart = [];
        Object.entries(cartredis.items).forEach(entry => {
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
            tong_tien:              cartredis.totalPrice,
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
                var resultUpdate= await productModel.updateSoluong(orderChiTiet,'DES',redisClientService);
                //có 1 sản phẩm sai ID || số lượng sản phẩm không đủ 
                if(404==resultUpdate.status){
                    //xóa đơn hàng fail
                    await orderModel.deleteHDByID({id:valueChiTiet.id_hoadon});
                    return res.json(resultUpdate);
                }
                response.message="Create order success.";  
                //xóa giỏ hàng 
                await redisClientService.del(`cart:${req.user.id}`);

                
                //gửi bill qua email 
                sendMail.SendMailBillOrder(valueChiTiet.id_hoadon);

            }
        }

        

        res.json(response);
    },
     //cap nhat trang thai don hang (hủy đơn)
    changeStatusOrder:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;

        var response={
            status:201,
            message:""
        };

        var value={ trang_thai:0  }
        var condition={ id:req.params.id    }

        var details = await orderModel.getOrderByID(condition);

         //trang thai đơn đã duyệt. OR đơn hàng không phải của tài khoản login 
        //thì không cho hủy đơn 
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

                var resultUpdate= await productModel.updateSoluong(valueChiTiet,'HUYDON',redisClientService);
                //có 1 sản phẩm sai ID 
                if(404==resultUpdate.status){
                    return res.json(resultUpdate);
                }
                response.message="hủy đơn thành công";
            }
            
            //delete redis getOrderDetails by this ID 
            await redisClientService.del(`getOrderDetails:${condition.id}`);
        }
        res.json(response);
    },
}