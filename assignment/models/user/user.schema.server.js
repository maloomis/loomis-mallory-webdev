module.exports = function() {
    var mongoose = require("mongoose");
    var autopopulate = require("mongoose-autopopulate");
    var Schema = mongoose.Schema;
    
    var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    websites: [{
        type: Schema.ObjectId, 
        ref: 'WebsiteModel', 
        autopopulate: true}],
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "user"});
    UserSchema.plugin(autopopulate);
    return UserSchema;
}