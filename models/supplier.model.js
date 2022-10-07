const db = require('../util/db');
const TABLE="nhacungcap";

module.exports={
   get: function(condition){
         var result;
         if(condition.ten_ncc==undefined){
            result   = db.get(TABLE,condition.limit,condition.offset);
         }else{
            var args=[condition.ten_ncc,condition.limit,condition.offset];
            result   = db.load(`select * from ${TABLE} where ten_ncc LIKE ? LIMIT ? OFFSET ?  `,args);
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
      return db.load(`SELECT * from ${TABLE} WHERE id=?`,condition.id);
   }
}