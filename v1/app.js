const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const auth_mdw=require("./mdw/_auth.mdw")
const cors=require('cors');
require('dotenv').config();
const port = process.env.PORT;
const config=require("./config/default.json");
require('express-async-errors');

try{
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    app.use(cors({
      origin: [config.corsLinkClientUI,config.corsLinkAdminUI],
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
      credentials: true
    }));

    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));

    app.use('/public',express.static('public'))
    
    //Authorization middleware 
    app.use(auth_mdw.loggedIn);

   


    //admin routers
    require("./routers/order.router").orderRouters(app);
    require("./routers/phieunhap.router").PhieuNhapRouters(app);
    require("./routers/supplier.router").supplierRouters(app);
    require("./routers/product.router").productRouters(app);
    require("./routers/category.router").categoryRouters(app);
    require("./routers/thuonghieu.router").thuonghieuRouters(app);
    require("./routers/staff.router").staffRouters(app);
    require("./routers/customer.router").customerRouters(app);
    require("./routers/permission.router").permissionRouters(app);
    require("./routers/authentication.router").AuthenticateRouters(app);
    require("./routers/uploadImageProduct.router").uploadRouters(app);

    //client routers 
    require("./routers/_category.router").categoryClientRouters(app);
    require("./routers/_thuonghieu.router").thuonghieuClientRouters(app);
    require("./routers/_supplier.router").supplierRouters(app);
    require("./routers/_product.router").productRoutersClient(app);
    require("./routers/_cart.router").CartRoutersClient(app);
    require("./routers/_authentication.router").AuthenticateClientRouters(app);
    require("./routers/_order.router").orderRoutersClient(app);
    require("./routers/_customer.router").customerRouters(app);


    app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!")
    })

    app.use((err, req, res, next) => {
      console.log(err.stack)
      res.status(500).send('Something broke!')
    })

}catch(err){
  console.log(err);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})