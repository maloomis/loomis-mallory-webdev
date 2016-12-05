module.exports = function(app, model) {
    var mime = require('mime');
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '../../../public/project/upload');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });

    app.post('/api/trainer', createTrainer);
    app.get('/api/trainer/:tid', findTrainerById);
    app.get('/api/trainer/', findTrainerByCredentials);
    app.get('/api/searchTrainer', findTrainersByName);
    app.put('/api/trainer', updateTrainer);
    app.delete('/api/trainer/:tid', deleteTrainer);
    app.post ("/api/uploadTrainerProfile", upload.single('myFile'), uploadImage);
    app.get('/api/trainers', findTrainers);
    app.put('/api/trainer/:tid/client/:cid/message', messageTrainer);

    function createTrainer(req, res) {
        console.log("hello");
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
        model
            .trainerModel
            .findTrainerByCredentials(username, password)
            .then(
                function(trainers) {
                    if (trainers[0]) {
                        res.json(trainers[0]);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    };

    function findTrainers(req, res) {
        console.log("hello")
        model
            .trainerModel
            .findTrainers()
            .then(
                function(trainers) {
                    if(trainers) {
                        res.json(trainers);
                    } else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function findTrainersByName(req, res) {
        var trainerFirstName = req.query.firstname;
        var trainerLastName = req.query.lastname;
        console.log(trainerFirstName);
        console.log(trainerLastName);
        model
            .trainerModel
            .findTrainersByName(trainerFirstName, trainerLastName)
            .then(
                function(trainers) {
                    if(trainers) {
                        res.json(trainers);
                    } else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

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
        var trainer = req.body;
        model
            .trainerModel
            .updateTrainer(trainer)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteTrainer(req, res) {
        var trainerId = req.params.tid;
        model
            .trainerModel
            .deleteTrainer(trainerId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );

    }

    function messageTrainer(req, res) {
        var trainerId = req.params.tid;
        var clientId = req.params.cid;
        var message = req.body;

        model
            .trainerModel
            .messageTrainer(message, clientId, trainerId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function uploadImage(req, res) {
        var trainerId     = req.body.trainerId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log(trainerId);
        console.log(filename);

        model
            .trainerModel
            .uploadImage(trainerId, filename)
            .then(
                function(status) {
                    res.redirect('../project/index.html#/trainerProfile/'+ trainerId);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
}