const moment =require("moment");
module.exports={
    //format time when select in mysql
    //VD " 2022-11-05T03:30:54.000Z" về đúng định dạnh "2022-11-05 10:30:54"
    formatDate:function (date){
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
  
}
  