require('dotenv').config();
const customerModel = require("../models/customer.model");
const LINK = require("../util/links.json");
module.exports={
    use:function(passport){
       
        // serialize the user.id to save in the cookie session
        // so the browser will remember the user when login
        passport.serializeUser(function(user, cb) {
            console.log("-serializeUser-");
            //save in session
            //req.session.passport={user:...}
            cb(null, user);
        });
        
        // deserialize the cookieUserId to user in the database
        passport.deserializeUser(async function(obj, cb) {
            console.log("-deserializeUser-");
            try{
                var profileCustomer=await customerModel.getOne({id:obj.id});
                if(profileCustomer.length==0){
                    cb(new Error("Gmail account don't have in DB"));
                }else{
                    //user object attaches to the request as req.user   
                    cb(null, profileCustomer[0]);
                }
            }catch(err){
                console.log(err);
                cb(new Error("Failed to deserialize an user"));
            }
           
        });
    },
    callback:function(passport){
        return passport.authenticate('google', { failureRedirect: LINK.CLIENT.AUTHENTICATE_GOOGLE_ERROR });
    },
    authenticate:function(passport){
        return passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    }
}

/*
    https://blog.loginradius.com/engineering/google-authentication-with-nodejs-and-passportjs/
    https://viblo.asia/p/authentication-with-google-oauth-using-nodejs-passportjs-mongodb-gAm5yqAV5db
*/ 




