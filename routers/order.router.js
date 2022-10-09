const orderModel = require("../models/order.model");
const config     = require("../config/default.json");
module.exports = {
    orderRouters:function(app){
        app.get('/admin/order'                  ,this.setDefaultCustomerName,this.getListOrders);
        app.get('/admin/order/customer/:id'     ,this.setDefaultCustomerId,this.getListOrders);
        app.get('/admin/order/:id'              ,this.getOrderDetails);
        app.put('/admin/order/:id'              ,this.updateStatus);
        app.post('/admin/order'                 ,this.addNewOrder);
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
    //app new order
    addNewOrder:async function(req,res,next){


    }
}