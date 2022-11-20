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
    getList: function(condition,count=0){
        var result;
        condition.ten_tl=`%${condition.ten_tl}%`;
        if(condition.ten_tl=='%%'){
           if(count==0){
                result   = db.get(TABLE,condition.limit,condition.offset);
           }else{
                result   = db.load(`select count(*) as count from ${TABLE} where 1  `);
           }
          
        }else{
            var args=[condition.ten_tl];
            if(count==0){
                args.push(condition.limit);
                args.push(condition.offset);
                result   = db.load(`select * from ${TABLE} where ten_tl LIKE ? LIMIT ? OFFSET ?  `,args);
            }else{
                result   = db.load(`select count(*) as count from ${TABLE} where ten_tl LIKE ?  `,args);
            }
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