const db = require('../util/db');
const TABLE="image";

module.exports={
    //get danh sách ảnh(video) by ID product
    ListImageOrVideoByIDProduct:function(condition){
        var sql=`select * from ${TABLE} WHERE ? `;
        return db.load(sql,condition);
    },

    //thêm mới ảnh vài ID product
    add:function(value){
        return db.insert(TABLE,value);
    },

    //xóa ảnh(video) cũ của theo ID product
    delete:function(condition){
        return db.delete(TABLE,condition);
    }
}