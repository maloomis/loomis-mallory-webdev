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
        fitnessGoal: {type: String, enum: ['Lose Weight', 'Maintain Weight', 'Gain Weight']},
        img: String,
        favoriteRecipes: [{
            type: mongoose.Schema.ObjectId,
            ref: 'RecipeModel'
        }],
        trainers: [{
            type: mongoose.Schema.ObjectId,
            ref: 'TrainerModel'
        }],
        messages: [{
            message: String,
            trainer: {
                type: mongoose.Schema.ObjectId,
                ref: 'TrainerModel'
            }
        }],
        type: String,
        dateCreated: { type: Date, default: Date.now}
        }, {collection: "client"});
    return ClientSchema;
}