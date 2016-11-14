module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var WebsiteSchema = require("../website/website.schema.server.js")();
    
    var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [WebsiteSchema],
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "user"});
    return UserSchema;
}