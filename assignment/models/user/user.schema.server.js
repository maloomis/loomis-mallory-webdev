module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    
    var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: ObjectId, ref: 'Website'}],
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "user"});
    return UserSchema;
}