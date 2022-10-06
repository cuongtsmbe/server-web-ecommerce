const db = require('../util/db');
const TABLE="nhacungcap";

module.exports={
   getSupplier:async function(condition){
        var lsSuppliers=await db.get(TABLE,condition.limit);
        return lsSuppliers;
   }
}