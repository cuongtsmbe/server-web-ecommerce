const dateMdw = require("./date.mdw");
module.exports={
    resultsFormatTime: function(results){
        
        //set time khi query select mysql " 2022-11-05T03:30:54.000Z" về đúng định dạnh "2022-11-05 10:30:54"
        return results.map(function(row) {

            if(row.Ngay_dat!==undefined){
                return Object.assign({}, row, { Ngay_dat: dateMdw.formatDate(row.Ngay_dat) });
            }else
            if(row.ngay_tao!==undefined){
                return Object.assign({}, row, { ngay_tao: dateMdw.formatDate(row.ngay_tao) });
            }else
            if(row.ngay_sua!==undefined){
                return Object.assign({}, row, { ngay_sua: dateMdw.formatDate(row.ngay_sua) });
            }
            //nếu không có trường hợp này thì sẽ trả về undefined nếu không rời vào trường hợp trên
            else{
                return Object.assign({}, row);
            }

        });
    }
}