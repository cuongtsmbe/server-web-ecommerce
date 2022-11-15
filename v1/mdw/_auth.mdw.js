const config=require("../config/default.json");
const jwt = require("jsonwebtoken");
const permissionModel = require("../models/permission.model");
require('dotenv').config();

module.exports={
    //Authorization middleware 
    loggedIn:async function (req, res, next) {
        let token = req.header('Authorization');
        let req_url = req.originalUrl;
        //không có Token có thể vào các đường dẫn
        if(!token && (
                req_url.includes("/authenticate/register/local") 
            || req_url.includes("/authenticate/login/local")
            || req_url.includes("/authenticate/statusToken")
            || req_url.includes("/authenticate/forget/pw")
            || req_url.includes("/authenticate/refreshToken")
            || req_url.includes("/cart")
            || (req_url.includes("/thuonghieu/list")  && !req_url.includes("/admin/thuonghieu/list"))
            || (req_url.includes("/thuonghieu/listAll")  && !req_url.includes("/admin/thuonghieu/listAll"))
            || (req_url.includes("/product/") && !req_url.includes("/admin/product/"))
            || req_url.includes("/listcategories")

            || req_url.includes("/admin/authenticate/refreshToken") 
            || req_url.includes("/admin/authenticate/login/local")
            || req_url.includes("/admin/authenticate/statusToken")
            || req_url.includes("/admin/authenticate/forget/pw")
        ) ){
            next();
            return ;
        }
        if (!token) return res.status(401).send("Access Denied");
    
        try {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length).trimLeft();
            }
            const verified = jwt.verify(token, process.env.TOKEN_SECRET_ACCESSTOKEN); 

            //account blocked(customer)
            if(verified.user_permission===false){
                return res.status(401).send("Unauthorized!");
            }
            
            if( verified.user_type === 'CUSTOMER' ){ // Check authorization
                
                //không được vào trang admin 
                if(req_url.includes("/admin/")){
                    return res.status(401).send("Unauthorized!");
                }

                //status is login : không được gọi đến register Or login
                if(req_url.includes("/authenticate/register/local") || req_url.includes("/authenticate/login/local") ){
                    return res.json({message: "is login"});
                }

            }
            if( verified.user_type === 'ADMIN' ){ 
                if(!req_url.includes("/admin/") ){
                    return res.status(401).send("Unauthorized!");
                }
                //khong thể vào trang login hay yêu cầu refreshToken khi đang login
                if(req_url.includes("/admin/authenticate/refreshToken") || req_url.includes("/admin/authenticate/login/local") ){
                    return res.json({message: "is login"});
                }

                //lấy danh sách các thư mục mà quyền đó có thể truy cập 
                var condition={
                    id:verified.user_permission
                };
                var ListIDcategory=await permissionModel.getIDDanhMucByIDquyen(condition);
                //Gắn ID danh muc đúng với trên DB
                var IDDanhMuc=0;
                if(req_url.includes("/admin/order") ){
                   IDDanhMuc=1; 
                }
                if(req_url.includes("/admin/product/") ){
                    IDDanhMuc=2; 
                }
                if(req_url.includes("/admin/category/") ){
                    IDDanhMuc=5; 
                }
                if(req_url.includes("/admin/supplier/") ){
                    IDDanhMuc=7; 
                }
                if(req_url.includes("/admin/staff/") ){
                    IDDanhMuc=8; 
                }
                if(req_url.includes("/admin/customer/") ){
                    IDDanhMuc=9; 
                }
                if(req_url.includes("/admin/permission/") ){
                    IDDanhMuc=11; 
                }

                //kiểm tra account có quyền truy cập không
                if(ListIDcategory.length==0){
                    return res.status(401).send("Unauthorized!");
                }
                const result = ListIDcategory.filter(obj => {
                    return obj.id_danhmuc==IDDanhMuc;
                });
                if(result.length==0){
                    return res.status(401).send("Unauthorized!");
                }

            }
            
            req.user = verified;
            next();
        }
        catch (err) {
            
            if(
                   req_url.includes("/authenticate/register/local") 
                || req_url.includes("/authenticate/login/local")
                || req_url.includes("/authenticate/statusToken")
                || req_url.includes("/authenticate/forget/pw")
                || req_url.includes("/authenticate/refreshToken")
                || req_url.includes("/cart")
                || (req_url.includes("/thuonghieu/list")  && !req_url.includes("/admin/thuonghieu/list"))
                || (req_url.includes("/thuonghieu/listAll")  && !req_url.includes("/admin/thuonghieu/listAll"))
                || (req_url.includes("/product/") && !req_url.includes("/admin/product/"))
                || req_url.includes("/listcategories")
    
                || req_url.includes("/admin/authenticate/refreshToken") 
                || req_url.includes("/admin/authenticate/login/local")
                || req_url.includes("/admin/authenticate/statusToken")
                || req_url.includes("/admin/authenticate/forget/pw")
            ){
                next();
            }else{
                res.status(400).send("Invalid Token");
            }
        }
    }
}
/*
    Tham khảo : 
    https://github.com/manashcse11/express/blob/master/auth/helpers/auth.middleware.js

*/