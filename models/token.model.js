const db = require('../util/db');
const TABLE="token";

module.exports={
    getOneRefreshToken:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE refreshToken=?`,condition.refreshToken);
    },
    add:function(value){
        return db.insert(TABLE,value);
    },
    delete:function(condition){
        return db.delete(TABLE,condition);
    },
    update:function(condition,value){
        return db.load(`UPDATE ${TABLE} SET ? WHERE refreshToken=${condition.refreshToken}`,value);
    },
}