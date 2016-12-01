module.exports = function(app, model) {
    app.post('/api/workout/:tid', createWorkout);
    app.get('/api/workout/:tid', findWorkoutsForTrainer);

    function createWorkout(req, res) {
        var trainerId = req.params.tid;
        var workout = req.body;
        model
            .workoutModel
            .createWorkout(trainerId, workout)
            .then(
                function(newWorkout) {
                    res.send(newWorkout);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findWorkoutsForTrainer(req, res) {
        var trainerId = req.params.tid;
        model   
            .workoutModel
            .findWorkoutsForTrainer(trainerId)
            .then(
                function(workouts) {
                    res.send(workouts);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
}