const db = require('../util/db');
const TABLE="khachhang";

module.exports={
    //get danh sach khach hang 
    //1. neu khong search : username+ten khach hang
    //2. neu co search    : username+ten khach hang
    //3. neu chi search   : username 
    //4. neu chi search   : ten khach hang
    getList: function(condition,count=0){
        var result;
        condition.ten_kh=`%${condition.ten_kh}%`;
        condition.username=`%${condition.username}%`;
        var sql="";
        if(count==0){
            sql=`select id as Ma_kh,ten_kh,ten_dangnhap,email,dia_chi,phone,ngay_tao,ngay_sua,trangthai `;
        }else{
            sql=`select count(*) as count `;
        }

        sql=sql.concat( ` from ${TABLE} `);
        if(condition.ten_kh=='%%' && condition.username=='%%'){
           
            var args=[];
            if(count==0){
                args.push(condition.limit);
                args.push(condition.offset);
                sql=sql.concat(` limit ? offset ? `);
            }
            result   = db.load(sql,args);

        }else if(condition.ten_kh!='%%' && condition.username!='%%'){
            var args=[condition.username,condition.ten_kh];

            sql=sql.concat(` where ten_dangnhap LIKE ? AND ten_kh LIKE ? `); 

            if(count==0){
                args.push(condition.limit);
                args.push(condition.offset);
                sql=sql.concat(` limit ? offset ? `);
            }
                    
            result   = db.load(sql,args);
        
        }else if(condition.ten_kh!='%%'){

           var args=[condition.ten_kh];
           sql=sql.concat(` where ten_kh LIKE ?  `); 
           if(count==0){
               args.push(condition.limit);
               args.push(condition.offset);
               sql=sql.concat(` limit ? offset ? `);
           }
           result   = db.load(sql,args);
        
        }else if(condition.username!='%%'){
            var args=[condition.username];
            
            sql=sql.concat(` where ten_dangnhap LIKE ?  `); 
            if(count==0){
                args.push(condition.limit);
                args.push(condition.offset);
                sql=sql.concat(` limit ? offset ? `);
            }
            result   = db.load(sql,args);
        
        }
       return result;
    },
    getOne:function(condition){
        var sql=`select id as Ma_kh,ten_kh,ten_dangnhap,email,dia_chi,phone,ngay_tao,ngay_sua,trangthai,mat_khau,salt `;
        return db.load(sql.concat(` from ${TABLE} WHERE ?`),condition);
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