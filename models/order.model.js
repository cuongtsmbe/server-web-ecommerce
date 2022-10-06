const db = require('../util/db');
const TABLE = "hoadon";
const TABLE_CTHD="cthoadon";
const TABLE_KH="khachhang";
const TABLE_SP="sanpham";
module.exports={
    //Xem chi tiết đơn hàng 
    //get information customer
    //get chi tiet san pham trong hoa don
    getDetails:async function(condition){
        var con={
            id_hoadon:condition.id
        }
       var CustomerDetails=await db.load(`SELECT * FROM ${TABLE} 
                            INNER JOIN ${TABLE_KH} ON ${TABLE_KH}.id=${TABLE}.id_khachhang
                            WHERE ${TABLE}.id=?`,con.id_hoadon);

            result={
                Ma_don_hang:    con.id_hoadon,
                Ma_khach_hang:  CustomerDetails[0].id_khachhang,
                Ngay_dat:       CustomerDetails[0].ngay_tao,
                Ten_khach_hang: CustomerDetails[0].ten_kh,
                Tong_tien:      CustomerDetails[0].tong_tien,
                Ma_giam_gia:    "chua co",
                Loai_khach_hang:"chua co",
                Trang_thai:     CustomerDetails[0].trangthai,
                Phuong_thuc_thanh_toan:"chua co",
                Email:          CustomerDetails[0].email,
                Phone:          CustomerDetails[0].phone,

            };

            var ListProductDetails=await db.load(`SELECT 
                cthd.id_sanpham as Ma_san_pham,cthd.id_hoadon as Ma_hoa_don,
                cthd.so_luong as So_luong_mua,cthd.Don_gia_khi_mua,
                ${TABLE}.tong_tien,${TABLE}.ngay_tao,sp.ten_sp as Ten_san_pham,sp.hinh_anh 
                FROM ${TABLE_CTHD} cthd
                INNER JOIN ${TABLE} ON cthd.id_hoadon=${TABLE}.id
                INNER JOIN ${TABLE_SP} sp ON sp.id=cthd.id_sanpham
                WHERE cthd.id_hoadon=?`,con.id_hoadon);
           
            result.data=ListProductDetails

        return result;
    },
    //Xem danh sách đơn hóa đơn  
    getList:async function(condition){
        var sql=`SELECT 
        HD.id as Ma_don_hang,HD.ngay_tao as Ngay_dat,KH.ten_kh as Ten_khach_hang,HD.tong_tien as Tong_tien,
        HD.id_nhanvien ,HD.trang_thai as Trang_thai 
        FROM (SELECT kh.id,kh.ten_kh FROM ${TABLE_KH} kh WHERE kh.ten_kh LIKE ?) as KH
        INNER JOIN ${TABLE} HD ON KH.id=HD.id_khachhang
        WHERE `;
        var args=[condition.Ten_KH,condition.trangThai,condition.dateStart,condition.dateEnd,condition.limit];
        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` HD.ngay_tao BETWEEN ? AND ? LIMIT ?`);
            //delete trangthai
            args.splice(1,1);
        }else if(condition.dateStart==undefined || condition.dateEnd==undefined){
            sql=sql.concat(`1`);
            args.splice(1,args.length);
        }else {
            sql=sql.concat(` HD.trang_thai=? AND HD.ngay_tao BETWEEN ? AND ? LIMIT ?`);
        }
        var listOrders=await db.load(sql,args);
        return listOrders;
    },
    //update order
    update:function(condition,value){
        var result= db.load(`UPDATE ${TABLE}
        SET trang_thai=?
        WHERE id=?`,[value.trang_thai,condition.id]);
        return result;
    }

}