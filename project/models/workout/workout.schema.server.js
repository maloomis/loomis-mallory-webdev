module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var WorkoutSchema = new Schema({
        _trainer: { 
            type: mongoose.Schema.ObjectId,
            ref: 'UserModel'
        },
        name: String,
        type: {type: String, enum: ['Cardio', 'Circuit', 'Gym/Strength']},
        length: Number,
        description: String,
        dateCreated: { type: Date, default: Date.now},
    }, {collection: "workout"});
    return WorkoutSchema;
}