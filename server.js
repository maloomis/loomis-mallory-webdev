var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webappmaker';
mongoose.connect(connectionString);

console.log("connected to mongoose");

require ("./assignment/app.js")(app);

var ipaddress = process.env.AWS_NODEJS_IP;
var port      = process.env.AWS_NODEJS_PORT || 3000;

console.log("Port Number", port);
app.listen(port, ipaddress);