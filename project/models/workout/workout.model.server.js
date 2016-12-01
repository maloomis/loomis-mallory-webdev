module.exports = function() {
    var mongoose = require("mongoose");
    var WorkoutSchema = require("./workout.schema.server.js")();
    var WorkoutModel = mongoose.model('WorkoutModel', WorkoutSchema);

    var api = {
        createWorkout: createWorkout,
    };
    return api;

    function createWorkout(workout) {
        console.log(workout)
        return WorkoutModel.create(workout);
    }
}
