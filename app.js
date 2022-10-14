const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var cors=require('cors');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use(session({
  secret: 'banhang',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));



//admin routers
require("./routers/order.router").orderRouters(app);
require("./routers/supplier.router").supplierRouters(app);
require("./routers/product.router").productRouters(app);
require("./routers/category.router").categoryRouters(app);
require("./routers/staff.router").staffRouters(app);
require("./routers/customer.router").customerRouters(app);
require("./routers/permission.router").permissionRouters(app);


//client routers 
require("./routers/_category.router").categoryClientRouters(app);
require("./routers/_product.router").productRoutersClient(app);
require("./routers/_cart.router").CartRoutersClient(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})