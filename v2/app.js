const express = require('express')
const session = require('express-session')
const app = express()
const port = 3002
var bodyParser = require('body-parser')
var auth_mdw=require("./mdw/_auth.mdw")
var cors=require('cors');

require('connect-redis')(session);
const redis = require('redis')
const rejson = require('redis-rejson');
const checkSession =require('./mdw/checkSession.mdw');
const RedisServices =require('./services/RedisServices');

require('express-async-errors');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors({
  origin: 'http://localhost:3006',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true
}));

app.use(session({
  secret: 'banhang',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use(checkSession);

rejson(redis);

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});


redisClient.on('connect', function() {
  console.log('Connected Redis!');
});
const redisClientService = new RedisServices(redisClient);

app.use((req,res,next)=>{
  res.locals.redisClientService=redisClientService;
  next();
});


//Authorization middleware 
app.use(auth_mdw.loggedIn);

app.use('/public',express.static('public'))

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})