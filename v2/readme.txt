-v2
-sử dụng redis giải quyết vấn đề (khi nhiều người đồng thời mua hàng) 
+ (v2: chỉ login mới có thể thêm vào giỏ (để tránh khó khăn khi đồng bộ dữ liệu trong giở hàng trc và sau khi loginn))
+ giải quyết vấn đề hiệu suất tránh truy vấn đồng thời trực tiếp vào mysql
+ tốc độ đọc redis gấp nhiều lần so với mysql
+ đồng bộ dữ liệu . Vì redis là đơn luồng . (các request đến sau sẽ đc xếp vào hàng đợi).
vì vậy nó có thể giải quyết. vấn đề mua quá hàng tồn kho(vd sp kho còn 1 mà 2 người mua hàng cùng 1 thời gian(cùng mili giây...)
khi không dùng redis thì DB sẽ bán ra 2 sp ) , ...

//phieu nhap tang so luong trong redis - V
//thanh toan giam so luong trong redis - V
// huy don tang so luong trong DB and redis  - V 
//test tinh nguyen tu cua redis trong create orders -V chưa test thử (apache bench)
// kiểm tra đơn bán quá  -V 
//update image - V 
//check duy nhat 1 email khi update hay register -V
//gửi email khi thay thổi trạng thái đơn hàng -V
//forget password phía admin -V

//get the loai theo id - V 
//get thuong hieu id - V
//nha cung cap theo id - V 
//get all the loai - V
//authenticate show danh sach quyen - V
//api order trả về số trang -V

//word API login email and phone -V
//login phone OTP - V
//login email OTP -V
//delete is update status -2 record -V
//sms with speedsms - V phải đăng kí  brandname mới dùng đc
//sms with esms (vihatgroup) OTP call-V
//trả về số trang  API quản lý - V
//kiểm tra status product !=-2 khi thêm vào cart -V
//email,phone client rieng biet trong DB -V
//email rieng biet trong DB phia Admin -V
//login google -V
//word phần login google-V
//chinh lại ID khi thêm khách hàng , order trên DB -V 


//realtime thong bao khi co don hang

//redisSearch 
//thanh toan online
//chỉnh lại ID đơn hàng khi nhiều người mua cùng luc
//chỉnh lại ID khách hàng khi nhiều người đăng kí cùng lúc

//tool tự động tạo map google 
//bán server (api) để người khác chỉ cần viết trang
client là có thể bán hàng(hoặc cấp trang client mẫu mặc định) 
https://online-hung.mysapo.net/admin/products
https://startupill.com/101-best-web-apps-startups-worth-a-follow-in-2021/






