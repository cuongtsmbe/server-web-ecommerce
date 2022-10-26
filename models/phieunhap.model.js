const db = require('../util/db');
const TABLE_PN = "phieunhap";
const TABLE_CTPN="ctphieunhap";
const TABLE_NCC="nhacungcap";
const TABLE_NV="nhanvien";
module.exports={
    //Xem danh sách phiếu nhập theo ID nha cung cap có điều kiện thời gian
    GetListByIDNCC: function(condition){
        var args=[condition.ID_NCC,condition.trangThai,condition.dateStart,condition.dateEnd,condition.limit,condition.offset];
      
        var sql=`SELECT PN.*,NV.ten_nv
        FROM (SELECT * FROM ${TABLE_PN} PN WHERE `
        sql=sql.concat( `PN.id_ncc=?`);
        sql=sql.concat(
            `) as PN
            INNER JOIN ${TABLE_NV} NV ON NV.id=PN.id_nv
            WHERE `
        );

        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` PN.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
            args.splice(1,1);//delete trangthai
        }else if(condition.trangThai==-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`1 LIMIT ? OFFSET ?`); 
            args.splice(1,3);//delete trangthai,dateStart,dateEnd
        }else if(condition.trangThai!=-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            args.splice(2,2);//delete dateStart,dateEnd
            sql=sql.concat(`PN.trangthai=? LIMIT ? OFFSET ?`); 
        }else{
            sql=sql.concat(` PN.trangthai=? AND PN.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
        }
        var listOrders= db.load(sql,args);
        return listOrders;
    },
    //Xem danh sách phiếu nhập trong khoảng thời gian 
    GetListByTime:function(condition){
        var args=[condition.trangThai,condition.dateStart,condition.dateEnd,condition.limit,condition.offset];

        var sql=`SELECT PN.*,NV.ten_nv,NCC.ten_ncc,NCC.email AS email_ncc,NCC.phone AS phone_ncc
        FROM (SELECT * FROM ${TABLE_PN} PN WHERE `;
        if(condition.trangThai!=-1){
            sql=sql.concat("trangthai=? AND ");
        }else{
            args.splice(0,1);//delete trangThai
        }
        sql=sql.concat(`PN.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
        sql=sql.concat(
            `) as PN
            INNER JOIN ${TABLE_NV} NV ON NV.id=PN.id_nv
            INNER JOIN ${TABLE_NCC} NCC ON NCC.id=PN.id_ncc;
            `
        );

        var listOrders= db.load(sql,args);
        return listOrders;
    },
    //cap nhat trang thai phieu nhap 
    //update trang thai hoa don
    update:function(condition,value){
        var result= db.load(`
        UPDATE ${TABLE_PN}
        SET trangthai=?
        WHERE id=?`,[value.trangthai,condition.id]);
        return result;
    },
    //get total monney phieu nhap from start date to end date
    getTotalMonneyByTime:function(condition){
        
        var args=[condition.dateStart,condition.dateEnd];
        var sql=`SELECT SUM(tong_tien) AS TotalMonney
        FROM ${TABLE_PN} PN
        WHERE` 
        if(condition.trangThai!=-1){
            sql=sql.concat(` PN.trangthai=? AND `);
            args.unshift(condition.trangThai);//add begin args
        }
        sql=sql.concat(` PN.ngay_tao BETWEEN ? AND ?`);

        var listOrders= db.load(sql,args);
        return listOrders;


    }
}