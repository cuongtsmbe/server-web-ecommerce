const db = require('../util/db');
const TABLE="sanpham";

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
   //lấy danh sách sản phẩm với nhiều điều kiện
   getListByCondition:function(condition){
        var result;
            condition.tensp     =   `%${condition.tensp}%`;
            condition.manHinh   =   `%${condition.manHinh}%`;
            condition.cpu       =   `%${condition.cpu}%`;
            condition.ram       =   `%${condition.ram}%`;
            condition.card      =   `%${condition.card}%`;
            condition.oCung     =   `%${condition.oCung}%`;

        var sql=`select * from ${TABLE} where ten_sp LIKE ? and manHinh LIKE ? and cpu LIKE ? and ram LIKE ? and card LIKE ? and oCung LIKE ? and don_gia BETWEEN ? AND ? `;
        var args=[condition.tensp,condition.manHinh,condition.cpu,condition.ram,condition.card,condition.oCung,condition.price_start,condition.price_end];
        if(condition.idthuonghieu!=-1){
            args.push(condition.idthuonghieu);
            sql=sql.concat(`and id_thuong_hieu=?`);
        }
        if(condition.idtheloai!=-1){
            args.push(condition.idtheloai);
            sql=sql.concat(`and id_the_loai=?`);
        }
        args.push(condition.limit);
        args.push(condition.offset);
        sql=sql.concat(`LIMIT ? OFFSET ?`);
        result=db.load(sql,args);
        return result;
   }
}