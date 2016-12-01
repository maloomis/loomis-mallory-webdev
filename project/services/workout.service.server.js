module.exports = function(app, model) {
    app.post('/api/workout', createWorkout);

    function createWorkout(req, res) {
        var workout = req.body;
        model
            .workoutModel
            .createWorkout(workout)
            .then(
                function(newWorkout) {
                    res.send(newWorkout);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }
}