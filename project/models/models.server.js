module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://127.0.0.1:27017/fitnessapp';
  //  mongoose.connect(connectionString);   
  //  console.log("connected to mongoose - project");

    var clientModel = require("./client/client.model.server")();
    var trainerModel = require("./trainer/trainer.model.server")();
    var recipeModel = require("./recipe/recipe.model.server")();
    var workoutModel = require("./workout/workout.model.server")();

    var model = {
        clientModel: clientModel,
        trainerModel: trainerModel,
        recipeModel: recipeModel, 
        workoutModel: workoutModel
    }
    return model;
};