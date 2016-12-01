module.exports = function() {
    var mongoose = require("mongoose");
    var WorkoutSchema = require("./workout.schema.server.js")();
    var WorkoutModel = mongoose.model('WorkoutModel', WorkoutSchema);

    var api = {
        createWorkout: createWorkout,
        findWorkoutsForTrainer: findWorkoutsForTrainer
    };
    return api;

    function createWorkout(trainerId, workout) {
        return WorkoutModel.create({
            _trainer: trainerId,
            name: workout.name,
            type: workout.type,
            length: workout.length,
            description: workout.description
        });
    }

    function findWorkoutsForTrainer(trainerId) {
        return WorkoutModel.find({
            _trainer: trainerId
        });
    }
}
