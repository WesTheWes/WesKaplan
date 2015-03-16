var express = require('express');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var app = express();
app.set('views', __dirname+ '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + 'public'))

app.use(require('./routes'));

app.listen(port);
console.log('server is running!');