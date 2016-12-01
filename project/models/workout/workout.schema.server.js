module.exports = function() {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    
    var WorkoutSchema = new Schema({
        name: String,
        type: {type: String, enum: ['Cardio', 'Circuit', 'Gym/Strength']},
        time: Number,
        level: {type: String, enum: ['Beginner', 'Intermediate', 'Advanced']},
        description: String,
        dateCreated: { type: Date, default: Date.now},
    }, {collection: "workout"});
    return WorkoutSchema;
}