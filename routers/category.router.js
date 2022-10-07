const categoryModel = require("../models/category.model");
const config     = require("../config/default.json");
module.exports = {
    categoryRouters:function(app){
        app.get('/admin/category/list'          ,this.setDefault,this.getListCategory);
        app.post('/admin/category/add'          ,this.add);
        app.put('/admin/category/edit/:id'      ,this.update);
        app.delete('/admin/category/delete/:id' ,this.delete);
    },
    setDefault:function(req,res,next){
        if(req.query.search==undefined){
            req.query.search='';
        }
        if(req.query.page==undefined){
            req.query.page=1;
        }
        next();
    },
    //lay danh sach the loai
    getListCategory:async function(req,res,next){
        var condition={
            ten_tl      :req.query.search,
            limit       :config.limitCategories,
            offset      :(req.query.page-1)*config.limitCategories
        };
        
        var result= await categoryModel.getList(condition);
        res.json({
            status:200,
            data:result
        })
    },
    //them the loai 
    add:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        if(req.body.Ten_the_loai==undefined || req.body.Ten_the_loai==''){
            response.message="Ten the loai empty";
            res.json(response);
        }
        var value={
            ten_tl:req.body.Ten_the_loai
        };
        var result=await categoryModel.add(value);
        if(result.affectedRows!=0){
            response.message=`Them the loai thanh cong . insertId: ${result.insertId}`;
        }else{
            response.message=`Them the loai khong thanh cong . failed`;
        }
        res.json(response);

    },
    //edit ten the loai
    update:async function(req,res,next){
        var response={
            status:201,
            message:""
        };
        var condition={
            id:req.params.id
        };
        var value={
            ten_tl :req.body.Ten_the_loai,
        };
        var result=await categoryModel.update(condition,value);
        if(result.affectedRows==0){
            response.status=201;
            response.message="update khong thanh cong";      
        }else{
            response.status=200;
            response.message="update thanh cong";  
        }
        res.json(response);
    },
    //delete the loai
    delete:async function(req,res,next){
            var response={
                status:201,
                message:""
            };
            var condition={
                id:req.params.id
            };
            var result=await categoryModel.delete(condition);
            if(result.affectedRows==0){
                response.status=500;
                response.message="delete khong thanh cong";
                
            }else{
                response.status=200;
                response.message="delete thanh cong";
            }
            res.json(response);
    }

}