
const Nexmo = require('nexmo');
require('dotenv').config();
module.exports={
    sendSMS:function (fromPhone, toPhone, content, callback){
        
        const nexmo = new Nexmo({
            apiKey: process.env.API_KEY_NEXMO,
            apiSecret: process.env.API_SECRET_NEXMO
        });

        nexmo.message.sendSms(fromPhone, toPhone, content, {
            type: "unicode"
          }, (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              if (responseData.messages[0]['status'] === "0") {
                callback("Message sent successfully.")
              } else {
                callback(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
            }
          }
        )

    }

}
  