const db = require('../util/db');
const TABLE="quyen";
const TABLE_PERMISSION_ITEM="quyendahmuc";
const TABLE_DANHMUC="danhmuc";
module.exports={
    getOneByID:function(condition){
        return db.load(`SELECT * from ${TABLE} WHERE id=?`,condition.id);
    },
    get: function(condition,count=0){
        if(count==0){
            return db.get(TABLE,condition.limit,condition.offset);
        }else{
            return db.load(`SELECT count(*) as count from ${TABLE} WHERE 1 `);
        }
    },
    //lấy danh sách ID danh mục mà ID quyền có quyền truy cập
    getIDDanhMucByIDquyen:function(condition){
        return db.load(`SELECT id_danhmuc from ${TABLE_PERMISSION_ITEM} WHERE id_quyen=?`,condition.id);
    },
    //lay danh sach danh muc mà quyền đó có thể truy cập 
    getDetails: function(condition){
        var sql =`
            SELECT DE.id as id_item ,DM.id as id_danhmuc,DM.ten_danhmuc from ${TABLE} PE
            INNER JOIN ${TABLE_PERMISSION_ITEM} DE ON PE.id=DE.id_quyen
            INNER JOIN ${TABLE_DANHMUC} DM ON DE.id_danhmuc=DM.id
            WHERE PE.id=?
        `;
        var result = db.load(sql,condition.id);
        return result;
    },
    add:function(value){
        return db.insert(TABLE,value);
    },
    delete:function(condition){
        return db.delete(TABLE,condition);
    },
    //them danh muc quan ly cho quyen
    addForPermission:function(value){
        var sql='';
        sql=`
            INSERT INTO ${TABLE_PERMISSION_ITEM} (id_quyen,id_danhmuc)
            VALUES
        `;
        for (var i = 0; i < value.ListIDDanhMuc.length; i++) {
            sql=sql.concat(` (${value.id_quyen}, ${value.ListIDDanhMuc[i]})`);
            if(i!=value.ListIDDanhMuc.length-1){
                sql=sql.concat(',');
            }
        }
        var result = db.load(sql);
        return result;
    },
    //xóa danh mục mà id_permission quản lý trong table: quyendahmuc
    deleteItemByIDPermission:function(condition){
        return db.delete(TABLE_PERMISSION_ITEM,condition);
    }
}