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
   }
}