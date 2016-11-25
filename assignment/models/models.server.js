module.exports = function() {
    var mongoose = require('mongoose');
    var autoIncrement = require('mongoose-auto-increment');
    var connectionString = 'mongodb://127.0.0.1:27017/webappmaker';
    mongoose.Promise = global.Promise;
    var connection = mongoose.connect(connectionString);   
    console.log("connected to mongoose - assignment");

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    }
    return model;
};