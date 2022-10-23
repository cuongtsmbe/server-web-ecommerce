const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var auth_mdw=require("./mdw/_auth.mdw")
var cors=require('cors');
require('express-async-errors');
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

//Authorization middleware 
app.use(auth_mdw.loggedIn);

//admin routers
require("./routers/order.router").orderRouters(app);
require("./routers/supplier.router").supplierRouters(app);
require("./routers/product.router").productRouters(app);
require("./routers/category.router").categoryRouters(app);
require("./routers/staff.router").staffRouters(app);
require("./routers/customer.router").customerRouters(app);
require("./routers/permission.router").permissionRouters(app);
require("./routers/authentication.router").AuthenticateRouters(app);

//client routers 
require("./routers/_category.router").categoryClientRouters(app);
require("./routers/_product.router").productRoutersClient(app);
require("./routers/_cart.router").CartRoutersClient(app);
require("./routers/_authentication.router").AuthenticateClientRouters(app);
require("./routers/_order.router").orderRoutersClient(app);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})