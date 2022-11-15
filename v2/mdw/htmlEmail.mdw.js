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
    }
}