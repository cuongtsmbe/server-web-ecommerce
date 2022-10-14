//session sẽ bị undefiled nếu viết cấu trúc như các file khác trong router
const cartModel         =require("../models/_cart.model");
const productModel      =require("../models/product.model");
module.exports = {
    
    CartRoutersClient:function(app){
        //lay danh sach san pham co trong cart
         app.get('/cart',function(req,res,next){
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
        app.post('/cart/add/:id',async function(req,res,next){
            var productId = req.params.id;
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
            var cart = new cartModel(req.session.cart ? req.session.cart : {});
            cart.add(product[0], productId);
            req.session.cart = cart;
            res.redirect('/cart');
        });
 
        //giảm số lượng sản phẩm trong giỏ hàng theo ID
        app.post('/cart/reduce/:id',async function(req,res,next){
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
            res.redirect('/cart');
        });

         //xóa sản phẩm theo ID 
        app.delete('/cart/remove/:id',function(req,res,next){
            var productId = req.params.id;
            var cart = new cartModel(req.session.cart ? req.session.cart : {});
    
            cart.remove(productId);
            req.session.cart = cart;
            res.redirect('/cart');
        });
    }
}