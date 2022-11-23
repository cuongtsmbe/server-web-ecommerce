require('dotenv').config();
var https = require('https');
var http = require('http');
module.exports={
    sendSMS:function (toPhone, content, callback){

      this.twilio(toPhone,content,callback);
      //speedsms va esms chưa thể chạy . vì chưa đăng kí brandname
      //this.speedsms(toPhone,content,callback);
      //this.esms(toPhone,content,callback);
    },
   
    twilio:function(toPhone, content, callback){
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilio = require('twilio');
        const client = new twilio(accountSid, authToken);

        console.log("SMS WILIO");
        client.messages
          .create({
            body: content,
            to: toPhone, // Text this number
            from: '+17817311388', // From a valid Twilio number
          })
          .then((message) => {console.log(message.sid); callback({status:200,message:message.sid})});

    },

    
    speedsms:function(toPhone, content, callback){
        const ACCESS_TOKEN = process.env.SPEEDSMS_ACCESSTOKEN;
        var url = 'api.speedsms.vn';
        var params = JSON.stringify({
            to: toPhone,
            content: content,
            sms_type: 2,
            sender: '' //cần đăng kí brandname
        });
    
        var buf = new Buffer(ACCESS_TOKEN + ':x');
        var auth = "Basic " + buf.toString('base64');
        const options = {
            hostname: url,
            port: 443,
            path: '/index.php/sms/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        };
    
        const req = https.request(options, function(res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function(d) {
                body += d;
            });
            res.on('end', function() {
                var json = JSON.parse(body);
                if (json.status == 'success') {
                    callback({status:200,message:"send sms success"});
                }
                else {
                    callback({status:205,message:"send sms failed " + body});
                }
            });
        });
    
        req.on('error', function(e) {
            callback({status:205,message:"send sms failed: " + e});
        });
    
        req.write(params);
        req.end();

    },

    //http://esms.vn/eSMS.vn_TailieuAPI.pdf
    esms:function(toPhone, content, callback){
        const apiKey = process.env.ESMS_API_KEY;
        const secretKey = process.env.ESMS_SECRET_KEY;
       
        url=`http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${toPhone}&Content=2646&ApiKey=${apiKey}&SecretKey=${secretKey}&SmsType=8`;
        http.get(url, res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', chunk => {
            console.log(data);
            data.push(chunk);
        });

        res.on('end', () => {
            console.log('Response ended: ');
            //const users = JSON.parse(Buffer.concat(data).toString());

            callback(Buffer.concat(data).toString());
        });
        }).on('error', err => {
            console.log('Error: ', err.message);
        });
    },


}

/*
     twilio:https://viblo.asia/p/twilio-sms-p1-L4x5xwvglBM
     speedsms:  https://connect.speedsms.vn/#/settings/overview
                https://speedsms.vn/wp-content/uploads/2018/04/SpeedSMSAPI.js
*/ 