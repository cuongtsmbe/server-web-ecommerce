var express = require('express');
var app = express();

// Phuong thuc get() phan hoi mot GET Request ve Homepage
app.get('/', function (req, res) {   
   res.sendFile('/PTPMMNM')
})

// Phuong thuc post() phan hoi mot POST Request ve Homepage
app.post('/', function (req, res) {
   console.log("Nhan mot POST Request ve Homepage");
   res.send('Hello POST');
})

// Phuong thuc delete() phan hoi mot DELETE Request ve /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Nhan mot DELETE Request ve /del_user");
   res.send('Hello DELETE');
})

// Phuong thuc nay phan hoi mot GET Request ve /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Nhan mot GET Request ve /list_user");
   res.send('Page Listing');
})

// Phuong thuc nay phan hoi mot GET Request ve abcd, abxcd, ab123cd, ...
app.get('/ab*cd', function(req, res) {
   console.log("Nhan mot GET request ve /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(3010, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})