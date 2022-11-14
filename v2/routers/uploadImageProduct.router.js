const multer        = require('multer');
const config        = require("../config/default.json");
const LINK          = require("../util/links.json");
const uploadModel   = require("../models/uploadImageproduct.model");
const DirUpload     = "./public";
const fs            = require('fs');
module.exports = {
    uploadRouters:function(app){        
        app.get(    LINK.ADMIN.UPLOAD_GET_BY_IDPRODUCT            ,this.getListByIDproduct);
        app.post(   LINK.ADMIN.UPLOAD_ADD_IMAGE                   ,this.uploadMultiImage);

    },
    getListByIDproduct:async function(req,res,next){
        var redisClientService=res.locals.redisClientService;
        var ID=req.params.idsanpham;

        var listIMG = await redisClientService.jsonGet(`product:${ID}:image`);

        if(!listIMG){
            
            listIMG=  await uploadModel.ListImageOrVideoByIDProduct({idproduct:ID});
            await redisClientService.jsonSet(`product:${ID}:image`,".",JSON.stringify(listIMG));
        
        }else{
            
            listIMG = JSON.parse(listIMG);

        }

        return res.json({
            status:200,
            list:listIMG
        });
    },
    uploadMultiImage:async function(req, res) {
        var redisClientService=res.locals.redisClientService;

        var IDproduct=req.params.idsanpham;

        //remove file in server
        var ls= await uploadModel.ListImageOrVideoByIDProduct({idproduct:IDproduct});
        for(var i=0;i<ls.length;i++){
            let filePath=`${DirUpload}/${ls[i].type}/${ls[i].name}`;
            fs.unlink(filePath, function(err) {
                if(err && err.code == 'ENOENT') {
                    //console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    // other errors, e.g. maybe we don't have enough permission
                    //console.error("Error occurred while trying to remove file");
                } else {
                    //console.info(`removed`);
                }
            });
        }

        //delete ảnh cũ của product in DB
        await uploadModel.delete({idproduct:IDproduct});
        await redisClientService.del(`product:${IDproduct}:image`);

        
        var storage = multer.diskStorage({ 
            
            destination: function(req, file, cb) {
                if (file.mimetype.search("video") != -1) {
                    cb(null, `${DirUpload}/video`); 
                } else if (file.mimetype.search("image") != -1) {
                    cb(null, `${DirUpload}/image`);
                } else {
                    cb(null, false);
                    return ;
                }
            },
            filename: async function(req, file, cb) { 
                 var typeFile="image";
                 var nameFile=file.originalname;//tên file
                if (file.mimetype.search("video") != -1) {
                    typeFile="video";
                }
                var value={
                    idproduct:IDproduct,
                    name:nameFile,
                    type:typeFile
                };

                //thêm tên ảnh trong DB
                await uploadModel.add(value);
                cb(null, nameFile);
            }
        });

        //fileSize is bytes (maxSizeFileUpload MB)
        //chỉ được gửi 1 lần tối đa max_file_upload bức ảnh 
        var upload = multer({ storage: storage,limits: { fileSize: config.maxSizeFileUpload * 1024 * 1024 } }).array('ListPhoto', config.max_file_upload);

        //upload image to server 
        upload(req, res, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status:500,
                    message: `Error uploading image OR video . Limit the number of files to upload is <= ${config.max_file_upload} `
                });
    
            }

            return res.status(200).json({
                status:200,
                message:"File is uploaded"
            });
        });

    }
}