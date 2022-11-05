const db = require('../util/db');
const TABLE="theloai";

module.exports={
    getOneByID:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE id=?`,condition.id);
    },
    getAll:function(){
        var result   = db.load(`select id,ten_tl as ten_the_loai from ${TABLE}`);
        return result;
    },
    getList: function(condition){
        var result;
        condition.ten_tl=`%${condition.ten_tl}%`;
        if(condition.ten_tl=='%%'){
           result   = db.get(TABLE,condition.limit,condition.offset);
        }else{
           var args=[condition.ten_tl,condition.limit,condition.offset];
           result   = db.load(`select * from ${TABLE} where ten_tl LIKE ? LIMIT ? OFFSET ?  `,args);
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