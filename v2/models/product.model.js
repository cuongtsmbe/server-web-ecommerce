const db = require('../util/db');
const TABLE="sanpham";
const mysql = require('mysql');
const config = require("./../config/default.json");
module.exports={
   get: function(condition){
         var result;
         condition.search=`%${condition.search}%`;
         if(condition.idtheloai==-1 && condition.search==`%%`){
            result   = db.get(TABLE,condition.limit,condition.offset);
         }else if(condition.idtheloai==-1){
            var args=[condition.search,condition.limit,condition.offset];
            result   = db.load(`select * from ${TABLE} where ten_sp LIKE ? LIMIT ? OFFSET ? `,args);
         }else{
            var args=[condition.idtheloai,condition.search,condition.limit,condition.offset];
            result   = db.load(`select * from ${TABLE} where id_the_loai = ? AND ten_sp LIKE ? LIMIT ? OFFSET ?`,args);
        }
        return result;
   },
   add:function(value){
       return db.insert(TABLE,value);
   },
   update:function(condition,value){
      return db.load(`UPDATE ${TABLE} SET ? WHERE id=${condition.id}`,value);
   },
   delete:function(condition){
       return db.delete(TABLE,condition);
   },
   getOneByID:function(condition){
        return db.getOneByCondition(TABLE,condition);
   },
    //đếm danh sách sản phẩm với nhiều điều kiện
   CountListByCondition:function(condition){
            var result;
                condition.tensp     =   `%${condition.tensp}%`;
                condition.manHinh   =   `%${condition.manHinh}%`;
                condition.cpu       =   `%${condition.cpu}%`;
                condition.ram       =   `%${condition.ram}%`;
                condition.card      =   `%${condition.card}%`;
                condition.oCung     =   `%${condition.oCung}%`;

            var sql=`select count(*) AS count from ${TABLE} where ten_sp LIKE ? and manHinh LIKE ? and cpu LIKE ? and ram LIKE ? and card LIKE ? and oCung LIKE ? and don_gia BETWEEN ? AND ? `;
            var args=[condition.tensp,condition.manHinh,condition.cpu,condition.ram,condition.card,condition.oCung,condition.price_start,condition.price_end];

            //condition thuong hieu
            if(condition.idthuonghieu.length != 0 ){
                sql = sql.concat(" and ");
                for(var i=0;i<condition.idthuonghieu.length;i++){
                    args.push(condition.idthuonghieu[i]);
                    sql=sql.concat(` id_thuong_hieu=? `);
                    if(i!=condition.idthuonghieu.length-1){
                        sql=sql.concat(" OR ")
                    }
                }
            }
            if(condition.idtheloai!=-1){
                args.push(condition.idtheloai);
                sql=sql.concat(` and id_the_loai=? `);
            }
            result=db.load(sql,args);
            return result;
   },

    //lấy danh sách sản phẩm với nhiều điều kiện
    getListByCondition:function(condition){
        var result;
            condition.tensp     =   `%${condition.tensp}%`;
            condition.cpu       =   `%${condition.cpu}%`;
            condition.ram       =   `%${condition.ram}%`;
            condition.card      =   `%${condition.card}%`;
            condition.oCung     =   `%${condition.oCung}%`;
        var sqlManhinh="";
        for(var i=0;i<condition.manHinh.length;i++){
            sqlManhinh=sqlManhinh.concat(" and manHinh LIKE ? ");
        }
        var sql=`select * from ${TABLE} where ten_sp LIKE ?`
        sql=sql.concat(sqlManhinh);
        sql=sql.concat(` and cpu LIKE ? and ram LIKE ? and card LIKE ? and oCung LIKE ? and don_gia BETWEEN ? AND ? `);
        
        var args=[condition.tensp,condition.cpu,condition.ram,condition.card,condition.oCung,condition.price_start,condition.price_end];
        
        for(var i=0;i<condition.manHinh.length;i++){
            args.splice(1,0,condition.manHinh[i]);
        }
        //condition thuong hieu
        if(condition.idthuonghieu.length != 0 ){
            sql = sql.concat(" and ");
            for(var i=0;i<condition.idthuonghieu.length;i++){
                args.push(condition.idthuonghieu[i]);
                sql=sql.concat(` id_thuong_hieu=? `);
                if(i!=condition.idthuonghieu.length-1){
                    sql=sql.concat(" OR ")
                }
            }
        }
        if(condition.idtheloai!=-1){
            args.push(condition.idtheloai);
            sql=sql.concat(` and id_the_loai=? `);
        }

        //-1 : không sort
        // 0 : sort bán chay cao->thấp
        // 1 : giá cao -> thấp 
        // 2 : giá thấp -> cao

        if(condition.sort==0){
            sql=sql.concat(` order by sl_da_ban DESC `);
        }
        if(condition.sort==1){
            sql=sql.concat(` order by don_gia DESC `);
        }
        if(condition.sort==2){
            sql=sql.concat(` order by don_gia ASC `);
        }

        args.push(condition.limit);
        args.push(condition.offset);
        sql=sql.concat(` LIMIT ? OFFSET ? `);
        result=db.load(sql,args);
        return result;
   },


   //Lấy top sản phẩm bán chạy 
   //0.Lấy sản phẩm bán chạy nhất 
   //1.Lấy sản phẩm bán chạy nhất theo id thể loại
   getListTopSale:function(condition){
        var sql="";
        if(condition.idtheloai === null){
        //0
        sql=`SELECT * FROM ${TABLE}  ORDER BY sl_da_ban DESC LIMIT ${condition.limitTopSale}`;
        }else{
        //1
        sql=`SELECT * FROM ${TABLE} WHERE id_the_loai= ? ORDER BY sl_da_ban DESC LIMIT ${condition.limitTopSale}`;
        }
        return db.load(sql,condition.idtheloai);
   },


   //lấy danh sách sản phẩm có liên quan
   getListRelevant:function(condition){
    var sql=`SELECT * FROM ${TABLE} WHERE id_the_loai= ${condition.idtheloai} AND id!=${condition.IDProduct}  LIMIT ${condition.limit}`;
    return db.load(sql);
   },



   //update so luong danh sach san pham(order,phieu nhap)
   //action: INS,DES
   //1.tăng số lượng sản phẩm trong kho
   //2.tăng số lượng bán , giảm số lượng tồn kho (create order)
   updateSoluong:async function(value,action,redisClientService=null){

    //get list product from DB
    var sql_get='';
    sql_get=`select * from ${TABLE} where `;
    for (var i = 0; i < value.Danh_sach_san_pham.length; i++) {
        sql_get=sql_get.concat(`id=${value.Danh_sach_san_pham[i].id_san_pham}`);
        if(i!=value.Danh_sach_san_pham.length-1){
            sql_get=sql_get.concat(' OR ');
        }
    }

    var result_get = await db.load(sql_get);

    //Stop update nếu : có 1 ID sản phẩm không tồn tại trong DB
    if(result_get.length!=value.Danh_sach_san_pham.length){

        var ListIDProductInResultGet=[];
        for (var i = 0; i < result_get.length; i++) {
            ListIDProductInResultGet.push(result_get[i].id);
        }

        var ListIDProductNoExist=[];
        for (var i = 0; i < value.Danh_sach_san_pham.length; i++) {

            //ID SP trong value không tồn tại trong ListIDProductInResultGet
            if(false==ListIDProductInResultGet.includes(value.Danh_sach_san_pham[i].id_san_pham)){
                ListIDProductNoExist.push(value.Danh_sach_san_pham[i].id_san_pham);
            }

        }

        return {
            status:404,
            ListIDProductNoExist
        };
    }
    //1
    if(action==='INS'){
        for (var i = 0; i < result_get.length; i++) {
            result_get[i].so_luong=result_get[i].so_luong+value.Danh_sach_san_pham[i].So_luong;
        }
    }
    //2
    if(action==='DES'){

        for (var i = 0; i < result_get.length; i++) {
            result_get[i].so_luong=result_get[i].so_luong-value.Danh_sach_san_pham[i].So_luong;
            result_get[i].sl_da_ban=result_get[i].sl_da_ban+value.Danh_sach_san_pham[i].So_luong;
        }

    }

    var connection = mysql.createConnection(config.mysql);
        connection.connect();
    var sql_update=``;
    
    for (var  i = 0; i <result_get.length; i++) {
        sql_update=`UPDATE ${TABLE} SET so_luong=${result_get[i].so_luong},sl_da_ban=${result_get[i].sl_da_ban} where sanpham.id=${result_get[i].id} ; `;
        try{
        connection.query(sql_update, function(error, results, fields) {
                if (error) {
                    throw error;
                    return ; 
                };
     
        });

        //update number product in redis
        var detailProduct = await redisClientService.jsonGet(`product:${result_get[i].id}`);
        
        if(detailProduct){
            detailProduct = JSON.parse(detailProduct);
            detailProduct[0].so_luong=result_get[i].so_luong;
            detailProduct[0].sl_da_ban=result_get[i].sl_da_ban;
            await redisClientService.jsonSet(`product:${result_get[i].id}`,".",JSON.stringify(detailProduct));
        }

        }catch(err){
            console.log(`Error update so luong : ${err}`);
        }
    }
    connection.end();

    return {
        status:200,
        message:"update success"
    };

   }

}