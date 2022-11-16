const db = require('../util/db');
const TABLE="sanpham";
const mysql = require('mysql');
const configMysql = require("../config/configMysql");

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
        condition.cpu       =   `%${condition.cpu}%`;
        condition.ram       =   `%${condition.ram}%`;
        condition.card      =   `%${condition.card}%`;
        condition.oCung     =   `%${condition.oCung}%`;
        
    var sqlManhinh="";
    for(var i=0;i<condition.manHinh.length;i++){
        sqlManhinh=sqlManhinh.concat(" and manHinh LIKE ? ");
    }
    var sql=`select count(*) as count from ${TABLE} where ten_sp LIKE ?`
    sql=sql.concat(sqlManhinh);
    sql=sql.concat(` and cpu LIKE ? and ram LIKE ? and card LIKE ? and oCung LIKE ? and don_gia BETWEEN ? AND ? `);

    var args=[condition.tensp,condition.cpu,condition.ram,condition.card,condition.oCung,condition.price_start,condition.price_end];

    for(var i=0;i<condition.manHinh.length;i++){
        args.splice(1,0,`%${condition.manHinh[i]}%`);
    }
    //condition thuong hieu
    if(condition.idthuonghieu.length != 0 ){
        sql = sql.concat(" and ( ");
        for(var i=0;i<condition.idthuonghieu.length;i++){
            args.push(condition.idthuonghieu[i]);
            sql=sql.concat(` id_thuong_hieu=? `);
            if(i!=condition.idthuonghieu.length-1){
                sql=sql.concat(" OR ")
            }
        }
        sql = sql.concat(" ) ");
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
            args.splice(1,0,`%${condition.manHinh[i]}%`);
        }
        //condition thuong hieu
        if(condition.idthuonghieu.length != 0 ){
            sql = sql.concat(" and ( ");
            for(var i=0;i<condition.idthuonghieu.length;i++){
                args.push(condition.idthuonghieu[i]);
                sql=sql.concat(` id_thuong_hieu=? `);
                if(i!=condition.idthuonghieu.length-1){
                    sql=sql.concat(" OR ")
                }
            }
            sql = sql.concat(" ) ");
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
   //3. Hủy đơn . tăng số lượng trong kho . giảm số lượng đã bán
   updateSoluong:async function(value,action,redisClientService=null){
    //sort tăng dần theo ID sản phẩm
    value.Danh_sach_san_pham.sort((a,b) => a.id_san_pham - b.id_san_pham);
    
    //get list product from DB
    var sql_get='';
    sql_get=`select * from ${TABLE} where `;
    for (var i = 0; i < value.Danh_sach_san_pham.length; i++) {
        sql_get=sql_get.concat(`id=${value.Danh_sach_san_pham[i].id_san_pham}`);
        if(i!=value.Danh_sach_san_pham.length-1){
            sql_get=sql_get.concat(' OR ');
        }
    }

    //kết quả get sẽ được sắp tăng dần theo ID 
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
    //result_get[i] ứng với value.Danh_sach_san_pham[i] nguyên nhân 
    //hàm select mysql đã sort theo thứ tự ID sản phẩm 
    //trong khi đó giỏ hàng cx được sắp xếp theo thứ tự tăng dần ID product
    if(action==='INS'){
        for (var i = 0; i < result_get.length; i++) {
            var so_luong_tang=value.Danh_sach_san_pham[i].So_luong;
           
            //update redis
            var product=await redisClientService.jsonGet(`product:${result_get[i].id}`);
            if(product){
                product=JSON.parse(product);
                product[0].so_luong=product[0].so_luong + so_luong_tang;
                result_get[i].so_luong=product[0].so_luong;
                await redisClientService.jsonSet(`product:${result_get[i].id}`,'.',JSON.stringify(product));
            }else{
                result_get[i].so_luong=result_get[i].so_luong + so_luong_tang;
            }
        }
    }
    //2
    if(action==='DES'){
        var ListIDProductNotEnough=[];
        for (var i = 0; i < result_get.length; i++) {

            var so_luong_mua=value.Danh_sach_san_pham[i].So_luong;
            //ktra sản phẩm không đủ 
            
            var product=await redisClientService.jsonGet(`product:${result_get[i].id}`);
            if(product){
                product=JSON.parse(product);
               
                //số lượng còn lại < số lượng trong đơn hàng 
                if(product[0].so_luong<so_luong_mua ){
                    ListIDProductNotEnough.push(result_get[i].id);
                }
            }else if(result_get[i].so_luong<so_luong_mua){
                ListIDProductNotEnough.push(result_get[i].id);
            }

        }
        if(ListIDProductNotEnough.length>0){
            return {
                status:404,
                ListIDProductNotEnough
            };
        }


        //update redis
        /*
            phải update số lượng trong redis trước khi update trong DB để tránh 2 người vào dùng lúc
            lấy phải số lượng sản phẩm giống nhau.(Nguyên nhân redis có hàng đợi còn DB là multithread) 
            nếu trong khi update sql bị lỗi thì tăng lại số lượng trong redis. 
        */
        for (var i = 0; i < result_get.length; i++) {

            var so_luong_mua=value.Danh_sach_san_pham[i].So_luong;
           
            var product=await redisClientService.jsonGet(`product:${result_get[i].id}`);
            if(product){
                product=JSON.parse(product);
               
                product[0].so_luong=product[0].so_luong - so_luong_mua;
                product[0].sl_da_ban=product[0].sl_da_ban + so_luong_mua;

                result_get[i].so_luong= product[0].so_luong;
                result_get[i].sl_da_ban= product[0].sl_da_ban;
                
                await redisClientService.jsonSet(`product:${result_get[i].id}`,'.',JSON.stringify(product));
                
            }else{
                //sản phẩm không có trong redis 
                //nếu nhiều người mua cùng lúc thì số lượng sp trong DB sẽ không đúng trong trg hợp này 
                //nguyên nhân giải sử 2 người A,B cùng vào DB lấy số lượng sp X là Y trong cùng 1 thời gian
                //khi đó giả sử request cập nhật số lượng của B đến sau A thì số lượng sản phẩm sẽ theo của B.

                result_get[i].so_luong = result_get[i].so_luong - so_luong_mua;
                result_get[i].sl_da_ban = result_get[i].sl_da_ban + so_luong_mua;
            }
           
        
        }


    }
    //3 
    if(action==='HUYDON'){
        for (var i = 0; i < result_get.length; i++) {
            var so_luong_huy=value.Danh_sach_san_pham[i].So_luong;
            //update redis
            var product=await redisClientService.jsonGet(`product:${result_get[i].id}`);
            if(product){

                product=JSON.parse(product);

                product[0].so_luong=product[0].so_luong + so_luong_huy;
                product[0].sl_da_ban=product[0].sl_da_ban - so_luong_huy;

                result_get[i].so_luong= product[0].so_luong;
                result_get[i].sl_da_ban= product[0].sl_da_ban;
                await redisClientService.jsonSet(`product:${result_get[i].id}`,'.',JSON.stringify(product));
                
            }else{
                result_get[i].so_luong=result_get[i].so_luong + so_luong_huy;
                result_get[i].sl_da_ban=result_get[i].sl_da_ban - so_luong_huy;
            }
        }
    }

    var connection = mysql.createConnection(configMysql.json());
        connection.connect();
    var sql_update=``;
    
    for (var  i = 0; i <result_get.length; i++) {
        sql_update=`UPDATE ${TABLE} SET so_luong=${result_get[i].so_luong},sl_da_ban=${result_get[i].sl_da_ban} where sanpham.id=${result_get[i].id} ; `;
        try{
            connection.query(sql_update, function(error, results, fields) {
                    if (error) {
                        throw error;
                    };
            });

        }catch(err){

            //lỗi trong quá trình update trong DB
            //update number product in redis
        
            var detailProduct = await redisClientService.jsonGet(`product:${result_get[i].id}`);
            var so_luong_thay_doi=value.Danh_sach_san_pham[i].So_luong;

            if(detailProduct){
                detailProduct = JSON.parse(detailProduct);
                if(action==='INS'){
                    detailProduct[0].so_luong = detailProduct[i].so_luong-so_luong_thay_doi;
                }
                if(action==='DES'){
                    detailProduct[0].so_luong = detailProduct[0].so_luong + so_luong_thay_doi;
                    detailProduct[0].sl_da_ban = detailProduct[0].sl_da_ban - so_luong_thay_doi;
                }
                if(action==='HUYDON'){
                    detailProduct[0].so_luong = detailProduct[0].so_luong - so_luong_thay_doi;
                    detailProduct[0].sl_da_ban = detailProduct[0].sl_da_ban + so_luong_thay_doi;
                }
                await redisClientService.jsonSet(`product:${result_get[i].id}`,'.',JSON.stringify(detailProduct));
            }

            console.log(`Error update so luong:id ${result_get[i].id}`);
            console.log(`Error:  ${err}`);

        }
    }
    connection.end();

    return {
        status:200,
        message:"update success"
    };

   }

}