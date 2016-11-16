module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var ClientSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    weight: Number, 
    heightFeet: Number, 
    heightInches: Number,
    fitnessGoal: {type: String, enum: ['Loose Weight', 'Maintain Weight', 'Gain Weight']},
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "client"});
    return ClientSchema;
}