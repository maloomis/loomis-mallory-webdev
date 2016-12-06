module.exports = function(app, model) {
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var auth = authorized;
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

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }))

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use('trainer-local', new LocalStrategy(localTrainerStrategy));

    app.post('/api/registerTrainer', registerTrainer);
    app.post('/api/trainerLogin', passport.authenticate('trainer-local'), trainerLogin);
    app.post('/api/checkTrainerLogin', checkTrainerLogin);
    app.post('/api/trainerLogout', trainerLogout);
    app.get('/api/trainer/:tid', findTrainerById);
    app.get('/api/searchTrainer', findTrainersByName);
    app.put('/api/trainer', updateTrainer);
    app.delete('/api/trainer/:tid', deleteTrainer);
    app.post ("/api/uploadTrainerProfile", upload.single('myFile'), uploadImage);
    app.get('/api/trainers', findTrainers);
    app.put('/api/trainer/:tid/client/:cid/message', messageTrainer);
    app.delete('/api/trainer/:tid/message/:mid', deleteMessage);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function trainerLogout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function localTrainerStrategy(username, password, done) {
        model
            .trainerModel
            .findTrainerByUsername(username)
            .then(
                function (trainer) {
                    if (trainer && bcrypt.compareSync(password, trainer.password)) {
                        if (!trainer) { 
                            return done(null, false); 
                        }
                        return done(null, trainer);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function trainerLogin(req, res) {
        var trainer = req.user;
        res.json(trainer);
    }

    function checkTrainerLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function registerTrainer(req, res) {
        var trainer = req.body;
        trainer.password = bcrypt.hashSync(trainer.password);
        model
            .trainerModel
            .createTrainer(trainer)
            .then(
                function(trainer) {
                    if(trainer) {
                        req.login(trainer, function(err) {
                            if (err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(trainer);
                            }
                        })
                    }
                }
            )
    }

    function findTrainers(req, res) {
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
            .messageTrainer(message, trainerId, clientId)
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

    function deleteMessage(req, res) {
        var messageId = req.params.mid;
        var trainerId = req.params.tid;

        model
            .trainerModel
            .deleteMessage(trainerId, messageId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }
}