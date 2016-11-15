module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://127.0.0.1:27017/webappmaker';
   // mongoose.connect(connectionString);   
    console.log("connected to mongoose");

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel
    }
    return model;
};