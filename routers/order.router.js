const orderModel = require("../models/order.model");
const config     = require("../config/default.json");
module.exports = {
    orderRouters:function(app){
        app.get('/admin/order',this.getListOrders);
        app.get('/admin/order/:id',this.getOrderDetails);
        app.put('/admin/order/:id',this.updateStatus);
        app.post('/admin/order',this.addNew);
    },

    //lay danh sach hoa don
    getListOrders:async function(req,res,next){
        if(req.query.tenkh==undefined){
            req.query.tenkh='';
        }
        var condition={
            Ten_KH      :`%${req.query.tenkh}%`,     
            dateStart   :req.query.startdate,
            dateEnd     :req.query.enddate,
            trangThai   :req.query.trangthai,
            limit       :config.limitOrders
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
        var value={ trang_thai:req.body.Trang_thai  }
        var condition={ id:req.params.id    }
        var result=await orderModel.update(condition,value);
        if(result.changedRows==0){
            res.json({
                        status:201,
                        message:"update khong thanh cong"
                    })
        }else{
            res.json({
                        status:200,
                        message:"update thanh cong"
                    })
        }
    },
    //app new order
    addNew:async function(req,res,next){


    }
}