//session sẽ bị undefiled nếu viết cấu trúc như các file khác trong router
const cartModel         =require("../models/_cart.model");
const productModel      =require("../models/product.model");
const LINK = require("../util/links.json");
module.exports = {
    
    CartRoutersClient:function(app){
        //lay danh sach san pham co trong cart
         app.get(LINK.CLIENT.CART_GET   ,function(req,res,next){
            if (!req.session.cart) {
                return res.json ({
                    status:200,
                    title: 'Cart Shopping',
                    products: [],
                    totalItems: 0,
                    totalPrice: 0
                });
              }
            var cart = new cartModel(req.session.cart);
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
            
            //san pham ở trạng thái đã xóa trong DB
            if(product[0].trangthai==-2){
                return res.json({
                    status:404,
                    message: "Khong tim thay san pham muon them."
                });
            }
            var cart = new cartModel(req.session.cart ? req.session.cart : {});
            cart.add(product[0], productId,parseInt(value.sl));
            req.session.cart = cart;
            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });
 
        //giảm số lượng sản phẩm trong giỏ hàng theo ID
        app.post(LINK.CLIENT.CART_REDUCE_PRODUCT,async function(req,res,next){
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

            var cart = new cartModel(req.session.cart ? req.session.cart : {});
            cart.reduce(product[0], productId);
            req.session.cart = cart;
            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });

         //xóa sản phẩm theo ID 
        app.delete(LINK.CLIENT.CART_REMOVE_ITEM_PRODUCT,function(req,res,next){
            var productId = req.params.id;
            var cart = new cartModel(req.session.cart ? req.session.cart : {});
    
            cart.remove(productId);
            req.session.cart = cart;
            res.json({
                status:200,
                message: "chuyen den /cart"
            });
        });
    }
}