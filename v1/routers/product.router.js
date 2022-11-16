const productModel = require("../models/product.model");
const supplierModel=require("../models/supplier.model");
const categoryModel=require("../models/category.model");
const config     = require("../config/default.json");
const LINK = require("../util/links.json");
module.exports = {
    productRouters:function(app){
        app.get(    LINK.ADMIN.PRODUCT_GET_LIST             ,this.setDefault,this.get);
        app.get(    LINK.ADMIN.PRODUCT_GET_DETAILS          ,this.getOneByID);
        app.post(   LINK.ADMIN.PRODUCT_ADD                  ,this.add);
        app.put(    LINK.ADMIN.PRODUCT_EDIT                 ,this.update);
        app.delete( LINK.ADMIN.PRODUCT_DELETE               ,this.delete);
    },
    //set default 
    setDefault: function(req,res,next){
        if(req.query.page==undefined|| req.query.page<=0){
            req.query.page=1;
        }
        if(req.query.search==undefined){
            req.query.search='';
        }
        if(req.query.idtheloai==undefined){
            req.query.idtheloai=-1;
        }
       
        next();
    },
    //lay danh sach sản phẩm
    get:async function(req,res,next){
        var condition={
            limit:config.limitProducts,
            offset:config.limitProducts*(req.query.page-1),
            search:req.query.search,
            idtheloai:req.query.idtheloai
        };
        var result= await productModel.get(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //them moi sản phẩm
    //1. kiểm tra ID thể loại và ID nhà cung cấp có tồn tại 
    //2. them san pham 
    add:async function(req,res,next){
        var value={
            ten_sp      :req.body.Ten_san_pham,
            don_gia     :req.body.Don_gia,
            hinh_anh    :req.body.url_thumnail,
            noi_dung    :req.body.Noi_dung,
            manHinh     :req.body.Man_hinh,
            cpu         :req.body.Cpu,
            ram         :req.body.Ram,
            card        :req.body.Card,
            oCung       :req.body.O_cung,
            pin         :req.body.Pin,
            id_the_loai :req.body.Id_the_loai,
            id_thuong_hieu :req.body.Id_thuong_hieu,
            id_nha_cc   :req.body.Id_nha_cung_cap,
            so_luong    :req.body.So_luong,
            sl_da_ban   :req.body.So_luong_da_ban,
            trangthai   :req.body.Status
        };

        var response={
            status:201,
            message:""
        };
        var [NCC,TheLoai]=await Promise.all([
             supplierModel.getOneByID({id:value.id_nha_cc}),
             categoryModel.getOneByID({id:value.id_the_loai}),
            ]);
        
        if(NCC.length==0 && TheLoai.length==0){
            response.message="ID nha cung cap va ID the loai khong ton tai."
        }else if(NCC.length==0){
            response.message="ID nha cung cap khong ton tai.";
        }else if(TheLoai.length==0){
            response.message="ID the loai khong ton tai.";
        }else{
            var result=await productModel.add(value);
            if(result.affectedRows!=0){
                response.message=`Them san pham thanh cong . insertId: ${result.insertId}`;
            }else{
                response.message=`Them san pham khong thanh cong . failed`;
            }
        }

        res.json(response);
    },
    //update thong tin san pham
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value={
            ten_sp      :req.body.Ten_san_pham,
            don_gia     :req.body.Don_gia,
            hinh_anh    :req.body.url_thumnail,
            noi_dung    :req.body.Noi_dung,
            manHinh     :req.body.Man_hinh,
            cpu         :req.body.Cpu,
            ram         :req.body.Ram,
            card        :req.body.Card,
            oCung       :req.body.O_cung,
            pin         :req.body.Pin,
            id_the_loai :req.body.Id_the_loai,
            id_thuong_hieu :req.body.Id_thuong_hieu,
            id_nha_cc   :req.body.Id_nha_cung_cap,
            so_luong    :req.body.So_luong,
            sl_da_ban   :req.body.So_luong_da_ban,
            trangthai   :req.body.Status
        };
       
        var [NCC,TheLoai]=await Promise.all([
            supplierModel.getOneByID({id:value.id_nha_cc}),
            categoryModel.getOneByID({id:value.id_the_loai}),
           ]);
       
        if(NCC.length==0 && TheLoai.length==0){
            response.message="ID nha cung cap va ID the loai khong ton tai."
        }else if(NCC.length==0){
            response.message="ID nha cung cap khong ton tai.";
        }else if(TheLoai.length==0){
            response.message="ID the loai khong ton tai.";
        }else{
                var result=await productModel.update(condition,value);
            if(result.changedRows!=0){
                response.message=`Edit san pham thanh cong .`;
            }else{
                response.message=`Edit san pham khong thanh cong . failed`;
            }
        }

        res.json(response);
    },

    //delete san pham
    delete:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        if(req.params.id==undefined){
            response.message="Can them thong tin ID cua san pham . Delete Failed";
            res.json(response);
        }
        var condition={
            id:req.params.id
        };
        var result=await productModel.delete(condition);
        if(result.affectedRows==0){
            response.status=201;
            response.message="Xoa san pham khong thanh cong";
        }else{
            response.status=201;
            response.message="Xoa san pham thanh cong";
        }
        res.json(response);
    },
    //xem chi tiet mot san pham theo ID 
    getOneByID:async function(req,res,next){
        var condition={
            id:req.params.id
        };
        var detailProduct=await productModel.getOneByID(condition);
        res.json({
            status:200,
            data:detailProduct
        });
    }
};