const db = require('../util/db');
const TABLE="authmail";

module.exports={
    get:function(condition){
        var sql=`select * from ${TABLE} WHERE ? `;
        return db.load(sql,condition);
    },
    add:function(value){
        return db.insert(TABLE,value);
    },
    update:function(condition,value){
        return db.load(`UPDATE ${TABLE} SET ? WHERE email="${condition.email}"`,value);
    },
    delete:function(condition){
        return db.delete(TABLE,condition);
    }
}