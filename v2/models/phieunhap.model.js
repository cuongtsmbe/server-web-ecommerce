const db = require('../util/db');
const TABLE_PN = "phieunhap";
const TABLE_CTPN="ctphieunhap";
const TABLE_NCC="nhacungcap";
const TABLE_NV="nhanvien";
const TABLESP="sanpham";
module.exports={
    //Xem danh sách phiếu nhập theo ID nha cung cap có điều kiện thời gian
    GetListByIDNCC: function(condition,count=0){
        var args=[condition.ID_NCC,condition.trangThai,condition.dateStart,condition.dateEnd];
        var sql;
        if(count==0){
            sql=`SELECT PN.*,NV.ten_nv`;
        }else{
            sql=`SELECT count(*) as count `;
        }
        
        sql=sql.concat(` FROM (SELECT * FROM ${TABLE_PN} PN WHERE `);
        sql=sql.concat( `PN.id_ncc=?`);
        sql=sql.concat(
            `) as PN
            INNER JOIN ${TABLE_NV} NV ON NV.id=PN.id_nv
            WHERE `
        );

        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` PN.ngay_tao BETWEEN ? AND ? `);
            args.splice(1,1);//delete trangthai
        }else if(condition.trangThai==-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`1 `); 
            args.splice(1,3);//delete trangthai,dateStart,dateEnd
        }else if(condition.trangThai!=-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            args.splice(2,2);//delete dateStart,dateEnd
            sql=sql.concat(`PN.trangthai=? `); 
        }else{
            sql=sql.concat(` PN.trangthai=? AND PN.ngay_tao BETWEEN ? AND ? `);
        }
        
        if(count==0){
            args.push(condition.limit);
            args.push(condition.offset);
            sql=sql.concat(` LIMIT ? OFFSET ? `);
        }
        
        var listPN= db.load(sql,args);
        return listPN;
    },
    //Xem danh sách phiếu nhập trong khoảng thời gian 
    GetListByTime:function(condition){
        var sql;
        if(count==0){
            sql=`SELECT PN.*,NV.ten_nv,NCC.ten_ncc,NCC.email AS email_ncc,NCC.phone AS phone_ncc`;
        }else{
            sql=`SELECT count(*) as count `;
        }

        var args=[condition.trangThai,condition.dateStart,condition.dateEnd];

        sql=sql.concat(` FROM (SELECT * FROM ${TABLE_PN} PN WHERE `);
        if(condition.trangThai!=-1){
            sql=sql.concat("trangthai=? AND ");
        }else{
            args.splice(0,1);//delete trangThai
        }

        if(count==0){
            args.push(condition.limit);
            args.push(condition.offset);
            sql=sql.concat(` PN.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
        }else{
            sql=sql.concat(` PN.ngay_tao BETWEEN ? AND ? `);
        }

       
        sql=sql.concat(
            `) as PN
            INNER JOIN ${TABLE_NV} NV ON NV.id=PN.id_nv
            INNER JOIN ${TABLE_NCC} NCC ON NCC.id=PN.id_ncc;
            `
        );

        var listPN= db.load(sql,args);
        return listPN;
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

        var result= db.load(sql,args);
        return result;


    },
    //lấy thông tin phiếu nhập theo ID phiếu nhập 
    getPhieuNhapByID:function(condition){
        var args=[condition.IDPhieuNhap];
      
        var sql=`SELECT PN.*,NV.ten_nv,NCC.ten_ncc as ten_ncc,NCC.email as email_ncc
        FROM (SELECT * FROM ${TABLE_PN} PN WHERE `
        sql=sql.concat( `PN.id=?`);
        sql=sql.concat(
            `) as PN
            INNER JOIN ${TABLE_NV} NV ON NV.id=PN.id_nv
            INNER JOIN ${TABLE_NCC} NCC ON NCC.id=PN.id_ncc;
            `
        );

        var PN= db.load(sql,args);
        return PN;
    },
    //lấy chi tiết phiếu nhâp 
    getProductInCTPN:function(condition){
        var args=[condition.IDPhieuNhap];
            
        var sql=`SELECT *,SP.ten_sp 
        FROM (SELECT * FROM ${TABLE_CTPN} CTPN WHERE `
        sql=sql.concat( `CTPN.id_phieunhap=?`);
        sql=sql.concat(
            `) as CTPN
            INNER JOIN ${TABLESP} SP ON SP.id=CTPN.id_sp;
            `
        );

        var listPN= db.load(sql,args);
        return listPN;  
    },
    //create phieu nhap 
    addPhieuNhap:function(value){
        return db.insert(TABLE_PN,value);
    },
    //add to chi tiet phieu nhap 
    addPhieuNhapDetails:function(value){
        var sql='';
        sql=`
            INSERT INTO ${TABLE_CTPN} (id_phieunhap,id_sp,don_gia_nhap,so_luong)
            VALUES
        `;
        for (var i = 0; i < value.Danh_sach_san_pham.length; i++) {
            sql=sql.concat(` (${value.id_phieunhap},${value.Danh_sach_san_pham[i].id_san_pham},${value.Danh_sach_san_pham[i].Price},${value.Danh_sach_san_pham[i].So_luong})`);
            if(i!=value.Danh_sach_san_pham.length-1){
                sql=sql.concat(',');
            }
        }
        var result = db.load(sql);
        return result;
    },
    //Delete phieu nhap by ID
    deletePNByID:function(condition){
        return db.delete(TABLE_PN,condition);
    } 


}