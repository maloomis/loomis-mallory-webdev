module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var TrainerSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    img: String,
    workouts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'WorkoutModel'
    }],
    clients: [{
        type: mongoose.Schema.ObjectId,
        ref: 'ClientModel'
    }],
    messages: [{
        message: String,
        client: {
            type: mongoose.Schema.ObjectId,
            ref: 'ClientModel'
        }
    }],
    type: String,
    dateCreated: { type: Date, default: Date.now}
    }, {collection: "trainer"});
    return TrainerSchema;
}