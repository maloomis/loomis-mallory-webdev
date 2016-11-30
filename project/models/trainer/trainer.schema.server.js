module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var TrainerSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "trainer"});
    return TrainerSchema;
}