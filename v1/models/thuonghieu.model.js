const db = require('../util/db');
const TABLE="thuonghieu";

module.exports={
    getOneByID:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE id=?`,condition.id);
    },
    getAll:function(){
        var result   = db.load(`select id,ten_th from ${TABLE}`);
        return result;
    },
    getList: function(condition){
        var result;
        condition.ten_th=`%${condition.ten_th}%`;
        if(condition.ten_th=='%%'){
           result   = db.get(TABLE,condition.limit,condition.offset);
        }else{
           var args=[condition.ten_th,condition.limit,condition.offset];
           result   = db.load(`select * from ${TABLE} where ten_th LIKE ? LIMIT ? OFFSET ?  `,args);
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