module.exports = function(app){
    
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/test", function(err,db) {
        if (!err) {
            console.log("we are connected");
        }
    });

    var connectionString = 'mongodb://127.0.0.1:27017/test';

    var mongoose = require("mongoose");
    var mongodbUri = 'mongodb://loomis.m:dance434@ds035776.mlab.com:35776/mallorywebdev';
    mongoose.connect(mongodbUri);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
}