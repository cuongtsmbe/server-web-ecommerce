//session sẽ bị undefiled nếu viết cấu trúc như các file khác trong router
const cartModel         =require("../models/_cart.model");
const productModel      =require("../models/product.model");
const LINK = require("../util/links.json");
module.exports = {
    
    CartRoutersClient:function(app){
        //lay danh sach san pham co trong cart
         app.get(LINK.CLIENT.CART_GET   ,async function(req,res,next){
            var redisClientService=app.get("redisClientService");
            var cartredis = await redisClientService.jsonGet(`cart:${req.user.id}`);

            if (!cartredis) {
                return res.json ({
                    status:200,
                    title: 'Cart Shopping',
                    products: [],
                    totalItems: 0,
                    totalPrice: 0
                });
              }
            var cart = new cartModel(JSON.parse(cartredis));
            
            res.json( {
                status:200,
                title: 'Cart Shopping',
                products: cart.getItems(),
                totalItems: cart.totalItems,
                totalPrice: cart.totalPrice
            })
        });


        //them vao gio hang 

        app.post(LINK.CLIENT.CART_ADD_PRODUCT ,async function(req,res,next){
            var redisClientService=app.get("redisClientService");

            var productId = req.params.id;
            
            var value ={
                sl:req.params.sl ? req.params.sl : 1
            };

            if(parseInt(value.sl)<=0){
                return res.json({
                    status:204,
                    message: "so luong phai > 0"
                });
            }
            
            var condition={
                id:productId
            };
            var product=await productModel.getOneByID(condition);
            if(product.length==0){
                res.json({
                    status:404,
                    message: "Khong tim thay san pham muon them."
                });
                return false;
            }
            //get in redis
            var cartredis = await redisClientService.jsonGet(`cart:${req.user.id}`);
            var cart = new cartModel(cartredis ? JSON.parse(cartredis) : {});

            cart.add(product[0], productId,parseInt(value.sl));

            //save in redis 
            await redisClientService.jsonSet(`cart:${req.user.id}`,".",JSON.stringify(cart));

            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });
 
        //giảm số lượng sản phẩm trong giỏ hàng theo ID
        app.post(LINK.CLIENT.CART_REDUCE_PRODUCT,async function(req,res,next){
            var redisClientService=app.get("redisClientService");

            var productId = req.params.id;
            var condition={
                id:productId
            };
            var product=await productModel.getOneByID(condition);
            if(product.length==0){
                res.json({
                    status:404,
                    message: "Khong tim thay du lieu san pham muon giam ."
                });
                return false;
            }

            //get in redis 
            var cartredis = await redisClientService.jsonGet(`cart:${req.user.id}`);
            var cart = new cartModel(cartredis ? JSON.parse(cartredis) : {});
    
            cart.reduce(product[0], productId);
            
            //save in redis 
            await redisClientService.jsonSet(`cart:${req.user.id}`,".",JSON.stringify(cart));

            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });

         //xóa sản phẩm theo ID 
        app.delete(LINK.CLIENT.CART_REMOVE_ITEM_PRODUCT,async function(req,res,next){
            var redisClientService=app.get("redisClientService");

            var productId = req.params.id;

            //get in redis 
            var cartredis = await redisClientService.jsonGet(`cart:${req.user.id}`);

            if (!cartredis) {
                return  res.json({
                    status:200,
                    message: "chuyen den /cart"
                });
              }

            var cart = new cartModel(JSON.parse(cartredis));
    
            cart.remove(productId);
            //save in redis 
            await redisClientService.jsonSet(`cart:${req.user.id}`,".",JSON.stringify(cart));

            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });
    }
}