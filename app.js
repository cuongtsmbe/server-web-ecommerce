
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


require("./routers/order.router").orderRouters(app);
require("./routers/supplier.router").supplierRouters(app);
require("./routers/product.router").productRouters(app);
require("./routers/category.router").categoryRouters(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})