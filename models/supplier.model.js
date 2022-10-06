const db = require('../util/db');
const TABLE="nhacungcap";

module.exports={
   get: function(condition){
         var result;
         if(condition.ten_ncc==undefined){
            result   = db.get(TABLE,condition.limit);
         }else{
            var args=[condition.ten_ncc,condition.limit];
            result   = db.load(`select * from ${TABLE} where ten_ncc LIKE ? LIMIT ? `,args);
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
   }
}