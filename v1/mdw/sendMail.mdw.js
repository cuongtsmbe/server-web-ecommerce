const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const htmlEmail = require("./htmlEmail.mdw");
const OAuth2 = google.auth.OAuth2;
require('dotenv').config(); //  loads environment variables from a .env file into process.env

module.exports={
    createTransporter : async () => {
        try{
            const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
            );

            oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
            });
        
            const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                   
                    reject("Failed to create access token :" + err);

                }
                resolve(token);
            });
            });
        
            const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
            tls: {rejectUnauthorized: false},
            });
        
            return transporter;
        }catch(err){
            console.log(err);
            return null;
        }
    },
    //send mail 
    sendMail:async function(email,subject,text){
        try{
            var emailOptions={
                subject,
                html:text,
                to: email,
                from: process.env.EMAIL
            };
            let emailTransporter = await this.createTransporter();
            await emailTransporter.sendMail(emailOptions);
        }catch(err){
            console.log(err);
            return null;
        }
    },

    //send content "forget password" to email
    SendMailForgetPassword:function(email,token,url_UI){
            var subject='Reset password Ecommerce'; 
            var text=htmlEmail.htmlForgetPassword(url_UI,token);
            this.sendMail(email,subject,text);
    }
}
  
/**tham khao : 
 https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a 
**/