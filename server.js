var express = require('express');
var app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./assignment/app.js")(app);
require ("./project/app.js")(app);

var ipaddress = process.env.AWS_NODEJS_IP;
var port      = process.env.AWS_NODEJS_PORT || 3000;

console.log("Port Number", port);
app.listen(port, ipaddress);