const db = require('../util/db');
const TABLE = "hoadon";
const TABLE_CTHD="cthoadon";
const TABLE_KH="khachhang";
const TABLE_SP="sanpham";
module.exports={
    //Xem chi tiết đơn hàng 
    //1 get information customer
    //2 get chi tiet san pham trong hoa don
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
                Trang_thai:     CustomerDetails[0].trang_thai,
                Phuong_thuc_thanh_toan:"chua co",
                Email:          CustomerDetails[0].email,
                Phone:          CustomerDetails[0].phone,
                Dia_chi:        CustomerDetails[0].dia_chi,
            };

        var ListProductDetails=await db.load(`SELECT 
            cthd.id_sanpham as Ma_san_pham,cthd.id_hoadon as Ma_hoa_don,
            cthd.so_luong as So_luong_mua,cthd.Don_gia_khi_mua,
            ${TABLE}.ngay_tao,sp.ten_sp as Ten_san_pham,sp.hinh_anh 
            FROM ${TABLE_CTHD} cthd
            INNER JOIN ${TABLE} ON cthd.id_hoadon=${TABLE}.id
            INNER JOIN ${TABLE_SP} sp ON sp.id=cthd.id_sanpham
            WHERE cthd.id_hoadon=?`,con.id_hoadon);
        
        result.data=ListProductDetails

        return result;
    },

    //lấy danh sách đơn hàng theo status 
    getListByStatus:function(condition){
        var args=[condition.trangThai,condition.dateStart,condition.dateEnd,condition.limit,condition.offset];
        
        var sql=`SELECT *
        FROM ${TABLE} HD
        WHERE `;
        
        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` HD.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
            //delete trangthai
            args.splice(0,1);
        }else if(condition.trangThai==-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`1 LIMIT ? OFFSET ?`);
            args.splice(0,3);//delete trang thai,dateStart,dateEnd
        }else if(condition.trangThai!=-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`HD.trang_thai=? LIMIT ? OFFSET ?`);
            args.splice(1,2);//delete dateStart,dateEnd
        }else{
            sql=sql.concat(` HD.trang_thai=? AND HD.ngay_tao BETWEEN ? AND ? LIMIT ? OFFSET ?`);
        }
        var listOrders= db.load(sql,args);
        return listOrders;

    },
    //lấy danh sách sản phẩm đã mua theo id  hóa đơn 
    getproductsInDetail:function(condition){
        var sql=`select id_sanpham as id_san_pham,so_luong as So_luong from ${TABLE_CTHD} where ? `;
        var listOrders= db.load(sql,condition);
        return listOrders;
    },

    //lấy danh sách ID sản phẩm đã mua theo id  hóa đơn 
    getIdProductsInDetail:function(condition){
        var sql=`select id_sanpham from ${TABLE_CTHD} where ? `;
        var listOrders= db.load(sql,condition);
        return listOrders;
    },
    
    //Xem danh sách hóa đơn  
    getList: function(condition){
        var args=[condition.trangThai,condition.dateStart,condition.dateEnd];
        var sql=`SELECT 
        HD.id as Ma_don_hang,HD.ngay_tao as Ngay_dat,HD.id_khachhang,KH.ten_kh as Ten_khach_hang,HD.tong_tien as Tong_tien,
        HD.id_nhanvien ,HD.trang_thai as Trang_thai,phuong_thuc_thanh_toan
        FROM (SELECT kh.id,kh.ten_kh FROM ${TABLE_KH} kh WHERE `
        if(condition.GetByName==true){
            sql=sql.concat( `kh.ten_kh LIKE ?`);
            args.unshift(condition.Ten_KH);//add value at begin array
        }else{
            sql=sql.concat( `kh.id=?`);
            args.unshift(condition.ID_KH);
        }
        sql=sql.concat(
            `) as KH
            INNER JOIN ${TABLE} HD ON KH.id=HD.id_khachhang
            WHERE `
        );
            
        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` HD.ngay_tao BETWEEN ? AND ? `);
            //delete trangthai
            args.splice(1,1);
        }else if(condition.trangThai==-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`1 `);
            args.splice(1,3);//delete trang thai,dateStart,dateEnd
        }else if(condition.trangThai!=-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`HD.trang_thai=? `);
            args.splice(2,2);//delete dateStart,dateEnd
        }else{
            sql=sql.concat(` HD.trang_thai=? AND HD.ngay_tao BETWEEN ? AND ? `);
        }

        //sort =1 giảm dần 
        if(condition.sort==1){
            sql=sql.concat(` order by HD.tong_tien DESC`);
        }
        //sort =1 tăng dần 
        if(condition.sort==2){
            sql=sql.concat(` order by HD.tong_tien ASC`);
        }

        sql=sql.concat(` LIMIT ? OFFSET ? `);
        args.push(condition.limit);
        args.push(condition.offset);
        var listOrders= db.load(sql,args);
        return listOrders;
    },
    //đếm số lượng order với condition
    countGetListOrder:function(condition){
        var args=[condition.trangThai,condition.dateStart,condition.dateEnd];
        var sql=`SELECT 
            COUNT(*) as count
        FROM (SELECT kh.id,kh.ten_kh FROM ${TABLE_KH} kh WHERE `
        if(condition.GetByName==true){
            sql=sql.concat( `kh.ten_kh LIKE ?`);
            args.unshift(condition.Ten_KH);//add value at begin array
        }else{
            sql=sql.concat( `kh.id=?`);
            args.unshift(condition.ID_KH);
        }
        sql=sql.concat(
            `) as KH
            INNER JOIN ${TABLE} HD ON KH.id=HD.id_khachhang
            WHERE `
        );
            
        if(condition.trangThai==-1 && condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sql.concat(` HD.ngay_tao BETWEEN ? AND ? `);
            //delete trangthai
            args.splice(1,1);
        }else if(condition.trangThai==-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`1 `);
            args.splice(1,3);//delete trang thai,dateStart,dateEnd
        }else if(condition.trangThai!=-1 && (condition.dateStart==undefined || condition.dateEnd==undefined)){
            sql=sql.concat(`HD.trang_thai=? `);
            args.splice(2,2);//delete dateStart,dateEnd
        }else{
            sql=sql.concat(` HD.trang_thai=? AND HD.ngay_tao BETWEEN ? AND ? `);
        }

        //sort =1 giảm dần 
        if(condition.sort==1){
            sql=sql.concat(` order by HD.tong_tien DESC`);
        }
        //sort =2 tăng dần 
        if(condition.sort==2){
            sql=sql.concat(` order by HD.tong_tien ASC`);
        }

        sql=sql.concat(` LIMIT ? OFFSET ? `);
        args.push(condition.limit);
        args.push(condition.offset);
        var listOrders= db.load(sql,args);
        return listOrders;
    },

    //update trang thai hoa don
    update:function(condition,value){
        var result= db.load(`UPDATE ${TABLE}
        SET trang_thai=?
        WHERE id=?`,[value.trang_thai,condition.id]);
        return result;
    },
    //lay tong tien tat ca hoa don ma khachhang mua tu startdate -> enddate
    getTotalMonneyByIdCustomer:function(condition){
        var args=[condition.dateStart,condition.dateEnd];
        var sql=`SELECT id_khachhang,SUM(tong_tien) AS TotalItemsOrdered 
        FROM ${TABLE} HD
        WHERE id_khachhang=${condition.ID_KH} `;

        if(condition.trangThai!=-1){
            args.unshift(condition.trangThai);
            sql=sql.concat(` AND HD.trang_thai=? `)
        }
        if(condition.dateStart!=undefined && condition.dateEnd!=undefined){
            sql=sq.concat(` AND HD.ngay_tao BETWEEN ? AND ? `);
        }
        var listOrders= db.load(sql,args);
        return listOrders;
    },
    //Them hoa don (table:HOADON)
    addOrder:function(value){
        return db.insert(TABLE,value);
    },
    //them chi tiet hoa don
    addOrderDetails:function(value){
        var sql='';
        sql=`
            INSERT INTO ${TABLE_CTHD} (id_sanpham,Don_gia_khi_mua,id_hoadon,so_luong)
            VALUES
        `;
        for (var i = 0; i < value.Danh_sach_san_pham.length; i++) {
            sql=sql.concat(` (${value.Danh_sach_san_pham[i].id_san_pham},${value.Danh_sach_san_pham[i].Price},${value.id_hoadon},${value.Danh_sach_san_pham[i].So_luong})`);
            if(i!=value.Danh_sach_san_pham.length-1){
                sql=sql.concat(',');
            }
        }
        var result = db.load(sql);
        return result;
    },
    //delete hóa đon by ID 
    //chỉ xóa khi cố lỗi khi tạo chi tiết đơn hàng
    deleteHDByID:function(condition){
        return db.delete(TABLE,condition);
    },
    //lay order theo id
    getOrderByID:function(condition){
        var sql= `SELECT * FROM ${TABLE} WHERE ?`;
        var result = db.load(sql,condition);
        return result;
    }

}