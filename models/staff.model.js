const db = require('../util/db');
const TABLE="nhanvien";

module.exports={
    getOneByID:function(condition){
        var sql=`select id as Ma_nhan_vien,id_quyen,ten_nv,phone,ten_dangnhap,email,ngay_tao,ngay_sua `;
        return db.load(sql.concat(` from ${TABLE} WHERE id= ?`),condition.id);
    },
    //lấy danh sách staff theo condition
    getByCondition:function(condition){
        var sql=`select id as Ma_nhan_vien,mat_khau,salt,id_quyen,ten_nv,phone,ten_dangnhap,email,ngay_tao,ngay_sua `;
        return db.load(sql.concat(` from ${TABLE} WHERE ?`),condition);
    },
    getList: function(condition){
        var result;
        condition.ten_nv=`%${condition.ten_nv}%`;
        var sql=`select id as Ma_nhan_vien,id_quyen,ten_nv,phone,ten_dangnhap,email,ngay_tao,ngay_sua `;
        if(condition.ten_nv=='%%'){
            var args=[condition.limit,condition.offset];
            result   = db.load(sql.concat(` from ${TABLE} LIMIT ? OFFSET ?  `),args);
        }else{
           var args=[condition.ten_nv,condition.limit,condition.offset];
           result   = db.load(sql.concat(` from ${TABLE} where ten_nv LIKE ? LIMIT ? OFFSET ? `),args);
           
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