const db = require('../util/db');
const TABLE="quyen";

module.exports={
    getOneByID:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE id=?`,condition.id);
    }
}