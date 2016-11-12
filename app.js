module.exports = function(app){
    var connectionString = 'mongodb://127.0.0.1:27017/webappmaker';
    var mongodbUri = 'mongodb://loomis.m:dance434@ds035776.mlab.com:35776/mallorywebdev';

    if (process.env.MLAB_USERNAME) {
        var username = process.env.MLAB_USERNAME;
        var password = process.env.MLAB_PASSWORD;
        connectionString = 'mongodb://' + 
            process.env.MLAB_USERNAME + ':' +
            process.end.MLAB_PASSWORD +
            '@ds035776.mlab.com:35776/mallorywebdev';
    }

    var mongoose = require("mongoose");
    var db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/webappmaker", function(err,db) {
        if (!err) {
            console.log("we are connected");
        }
    });
}