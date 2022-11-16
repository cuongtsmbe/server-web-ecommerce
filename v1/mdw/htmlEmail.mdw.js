module.exports={
    htmlForgetPassword:function(urlUI,token){

        return `<html>
                <p>
                    Click to link below to reset password.<br><br>
                    This link expires in 15 minute <br><br>
                    <a href="${urlUI}?token=${token}"><b>Click here</b></a><br><br>
                    Dev by Ecommerce 11/2022
                </p>
                
        </html>`;
    },
    htmlStatusOrder:function(detailsOrder,Message){
        var stringStatus='';
        if(detailsOrder.Trang_thai==1){
            stringStatus="Đợi duyệt";
        }
        if(detailsOrder.Trang_thai==2){
            stringStatus="Đã duyệt";
        }
        if(detailsOrder.Trang_thai==3){
            stringStatus="Đang chuẩn bị hàng";
        }
        if(detailsOrder.Trang_thai==4){
            stringStatus="Đang giao";
        }
        if(detailsOrder.Trang_thai==5){
            stringStatus="Hoàn thành";
        }
        if(detailsOrder.Trang_thai==0){
            stringStatus="Đã hủy";
        }

        return `<html>
                <p>
                    Theo dõi đơn hàng của bạn !.<br><br>
                    Tình trạng đơn : <b>${stringStatus}</b> <br><br>
                    Lời nhắn : ${Message}. <br><br>
                    Dev by Ecommerce 11/2022
                </p>
                
        </html>`;
    },
    htmlBillOrder:function(detailsOrder){

        var hostnameImage="http://localhost:3001/public/image/";

        var htmlSection=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Email Template for Order Confirmation Email</title>
                
                <!-- Start Common CSS -->
                <style type="text/css">
                    #outlook a {padding:0;}
                    body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; font-family: Helvetica, arial, sans-serif;}
                    .ExternalClass {width:100%;}
                    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
                    .backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
                    .main-temp table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family: Helvetica, arial, sans-serif;}
                    .main-temp table td {border-collapse: collapse;}
                </style>
                <!-- End Common CSS -->
            </head>
            <body>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" class="backgroundTable main-temp" style="background-color: #d5d5d5;">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600" align="center" cellpadding="15" cellspacing="0" border="0" class="devicewidth" style="background-color: #ffffff;">
                                    <tbody>
                                        <!-- Start header Section -->
                                        <tr>
                                            <td style="padding-top: 30px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
                                                    <tbody>
                                                        <tr>
                                                            <td style="padding-bottom: 10px;">
                                                                <a href="https://htmlcodex.com"><img src="images/logo.png" alt="PapaChina" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                273 An duong vuong
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                P3,Q5,TP.HCM
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666;">
                                                                Phone: 034-961-5545 | Email: info@example.com
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 25px;">
                                                                <strong>Order ID :</strong> ${detailsOrder.Ma_don_hang} | <strong>Order Date:</strong> ${detailsOrder.Ngay_dat}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End header Section -->
                                        
                                        <!-- Start address Section -->
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
                                                    <tbody>
                                                        <tr>
                                        
                                                            <td style="width: 45%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                                Billing Address
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                ${detailsOrder.Ten_khach_hang}
                                                            </td>
                                               
                                                        </tr>
                                                        <tr>
                                           
                                                            <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                ${detailsOrder.Dia_chi}
                                                            </td>
                                                        </tr>
                                                       
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End address Section -->

                                        <!-- Start product Section -->
                                      
                                        `;
            var productList = '' ;
            for(var i=0;i<detailsOrder.data.length;i++){    
                productList=productList.concat(`<tr>  
                                        <td style="padding-top: 0;"> 
                                            <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee;">
                                                    <tbody>
                                                        <tr>
                                                            <td rowspan="4" style="padding-right: 10px; padding-bottom: 10px;">
                                                                <img style="height: 80px;" src="${hostnameImage}/${detailsOrder.data[i].hinh_anh}" alt="Product Image" />
                                                            </td>
                                                            <td colspan="2" style="font-size: 14px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                                ${detailsOrder.data[i].Ten_san_pham}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #757575; width: 440px;">
                                                                Quantity: ${detailsOrder.data[i].So_luong_mua}
                                                            </td>
                                                            <td style="width: 130px;"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #757575;">
                                                                Product ID: ${detailsOrder.data[i].Ma_san_pham}
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right;width:300px">
                                                                Đơn giá : ${detailsOrder.data[i].Don_gia_khi_mua} VND
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size: 14px; line-height: 18px; color: #757575; padding-bottom: 10px;">
                                                               
                                                            </td>
                                                            <td style="font-size: 14px; line-height: 18px; color: #757575; text-align: right; padding-bottom: 10px;">
                                                                <b style="color: #666666;"> Thành tiền : ${detailsOrder.data[i].Don_gia_khi_mua * detailsOrder.data[i].So_luong_mua}</b> 
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>`);
                                        
            };
            
            var footerContent= `<!-- End product Section -->
                                        
                                        <!-- Start calculation Section -->
                                        <tr>
                                            <td style="padding-top: 0;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                                    <tbody>
                                                        
                                                     
                                                        <tr>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                                Tổng tiền : 
                                                            </td>
                                                            <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                                ${detailsOrder.Tong_tien} VND
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        
                                        <!-- End calculation Section -->
                                        
                                        <!-- Start payment method Section -->
                                        <tr>
                                            <td style="padding: 0 10px;">
                                                <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                    <tbody>
                                                        
                                                        <tr>
                                                            <td colspan="2" style="font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                                                                Payment Method (Bank Transfer)
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                Bank Name:
                                                            </td>
                                                            <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                Account Name: 
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="width: 55%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                Bank Address:
                                                            </td>
                                                            <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
                                                                Account Number: 
                                                            </td>
                                                        </tr>
                                                        <tr><br></tr>
                                                        <tr>
                                                            <td colspan="2" style="width: 100%; text-align: center; font-style: italic; font-size: 13px; font-weight: 600; color: #666666; padding: 15px 0; border-top: 1px solid #eeeeee;">
                                                                <b style="font-size: 14px;">Note:</b> Đơn hàng chưa gồm phí ship .
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- End payment method Section -->
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </html>`;
        htmlcontent='';
        htmlcontent=htmlcontent.concat(htmlSection);
        htmlcontent=htmlcontent.concat(productList);
        htmlcontent=htmlcontent.concat(footerContent);

        return htmlcontent;
    }
}