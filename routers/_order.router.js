const config     = require("../config/default.json");
const orderModel = require("../models/order.model");
const LINK = require("../util/links.json");
module.exports = {
    orderRoutersClient:function(app){
        app.get( LINK.CLIENT.ORDER_GET_HISTORY                  ,this.setDefaultPage,this.getListOrders);
        app.get( LINK.CLIENT.ORDER_GET_TOTALMONNEY              ,this.getTotalMonneyOrders);
        app.get( LINK.CLIENT.ORDER_GET_DETAILS                  ,this.getOrderDetails);
    },
    //set default page
    setDefaultPage: function(req,res,next){
        res.locals.GetByName=false;
        if(req.query.page==undefined){
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

    }
}