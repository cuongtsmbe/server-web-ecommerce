const orderModel = require("../models/order.model");
const config     = require("../config/default.json");
module.exports = {
    orderRouters:function(app){
        app.get('/admin/order',this.setDefault,this.getListOrders);
        app.get('/admin/order/:id',this.getOrderDetails);
        app.put('/admin/order/:id',this.updateStatus);
        app.post('/admin/order',this.addNewOrder);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.tenkh==undefined){
            req.query.tenkh='';
        }
        if(req.query.page==undefined){
            req.query.page=1;
        }
        next();
    },
    //lay danh sach hoa don
    getListOrders:async function(req,res,next){
      
        var condition={
            Ten_KH      :`%${req.query.tenkh}%`,     
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai,
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