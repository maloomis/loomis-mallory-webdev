module.exports = function(app, model) {
    app.post('/api/trainer', createTrainer);
    app.get('/api/trainer/:tid', findTrainerById);
    app.get('/api/trianer/', findTrainerByCredentials);
    app.put('/api/trainer/:uid', updateTrainer);
    app.delete('/api/trainer/:uid', deleteTrainer);

    function createTrainer(req, res) {
        var trainer = req.body;
        console.log(trainer);
        model
            .trainerModel
            .createTrainer(trainer)
            .then(
                function(newTrainer) {
                    console.log(newTrainer);
                    res.send(newTrainer);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findTrainerByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };

    function findTrainerById(req, res) {
        var trainerId = req.params.tid;
        model
            .trainerModel
            .findTrainerById(trainerId)
            .then(
                function(trainer) {
                    if (trainer) {
                        res.send(trainer);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    };

    function updateTrainer(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        for (var u in users) {
            if (users[u]._id == uid) {
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].password = user.password;
                users[u].username = user.username;
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function deleteTrainer(req, res) {
        var uid = req.params.uid;

        for (var u in users) {
            if (users[u]._id == uid) {
                users.splice(users.indexOf(users[u]), 1);
                res.send('0');
                return;
            }
        }
        res.send('0');
    }
}