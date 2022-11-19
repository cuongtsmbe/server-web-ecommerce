const config     = require("../config/default.json");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const sendMail = require("../mdw/sendMail.mdw");
const LINK = require("../util/links.json");
module.exports = {
    orderRouters:function(app){
        app.get(    LINK.ADMIN.ORDER_GET_LIST                            ,this.setDefaultCustomerName,this.getListOrders);
        app.get(    LINK.ADMIN.ORDER_GET_LIST_BY_STATUS                  ,this.getListOrdersByStatus);
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

        //không sort
        if(req.query.sort==undefined){
            req.query.sort=-1;
        }
        next();
    },
    //set default ID customer
    setDefaultCustomerId: function(req,res,next){
        res.locals.GetByName=false;
        if(req.query.page==undefined){
            req.query.page=1;
        }
        if(req.query.sort==undefined){
            req.query.sort=-1;
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
                sort        :req.query.sort,
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
                sort        :req.query.sort,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };
        }
        var [result,countResult]=await Promise.all([
            await orderModel.getList(condition),
            await orderModel.countGetListOrder(condition)
           ]);
        res.json({
            status:200,
            data:result,
            countOrdersNoLimit:countResult[0],
            PageCurrent:req.query.page,
            TotalPage:Math.ceil(1.0*countResult[0].count/condition.limit)
        })
    },

    //thông kê theo tình trạng đơn hàng 
    getListOrdersByStatus:async function(req,res,next){
            if(req.query.page==undefined || req.query.page<=0){
                req.query.page=1;
            }
            if(req.query.trangthai==undefined){
                req.query.trangthai=-1;
            }
            var condition={
                dateStart   :req.query.startdate,
                dateEnd     :req.query.enddate,
                trangThai   :req.query.trangthai,
                limit       :config.limitOrders,
                offset      :(req.query.page-1)*config.limitOrders
            };
        var result= await orderModel.getListByStatus(condition);

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

        var value={ trang_thai:req.body.Trang_thai  };
        var Message=req.body.Message===undefined?'' : req.body.Message ;
        var condition={ id:req.params.id    };

        var details = await orderModel.getOrderByID(condition);

        //đơn đã hủy OR đơn hoàn thành . không cho thay đổi trạng thái
        if(details.length==0 || details[0].trang_thai==0 || details[0].trang_thai==5){
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
                //giảm số lượng bán ra
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

            //gửi status order to email
            sendMail.SendMailStatusOrder(condition.id,Message);

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
                //giảm số lượng sản phẩm trong kho
                var valueChiTiet={
                    Danh_sach_san_pham:     arrProduct      
                };
                var resultUpdate= await productModel.updateSoluong(valueChiTiet,'DES');
                //có 1 sản phẩm sai ID || không đủ hàng
                if(404==resultUpdate.status){
                    //xóa đơn hàng fail
                    await orderModel.deleteHDByID({id:valueHD.id});
                    return res.json(resultUpdate);
                }
                response.message="Create order success.";

                //gửi bill qua email 
                sendMail.SendMailBillOrder(valueHD.id);

            }
        }
        res.json(response);
    },
    //get total monney orders of customer by ID
    getTotalMonneyOrders:async function(req,res,next){
        if(req.query.trangthai==undefined){
            req.query.trangthai=-1;
        }
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

    },

}