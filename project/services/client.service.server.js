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
    passport.use('client-local', new LocalStrategy(localClientStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
   
    app.post('/api/registerClient', registerClient);
    app.post('/api/clientLogin', passport.authenticate('client-local'), clientLogin);
    app.post('/api/checkClientLogin', checkClientLogin);
    app.post('/api/clientLogout', clientLogout);;
    app.get('/api/client/:cid', findClientById);
    app.put('/api/client/:cid', auth, updateClient);
    app.delete('/api/client/:cid', auth, deleteClient);
    app.post ("/api/uploadProfile", upload.single('myFile'), uploadImage);
    app.put('/api/client/:cid/recipe/:rid', favoriteRecipe);
    app.delete('/api/client/:cid/recipe/:rid', unfavoriteRecipe);
    app.put('/api/client/:cid/trainer/:tid', followTrainer);
    app.delete('/api/client/:cid/trainer/:tid', unfollowTrainer);
    app.put('/api/client/:cid/trainer/:tid/message', messageClient);
    app.delete('/api/client/:cid/message/:mid', deleteMessage);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function clientLogout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function localClientStrategy(username, password, done) {
        model
            .clientModel
            .findClientByUsername(username)
            .then(
                function (client) {
                    if (client && bcrypt.compareSync(password, client.password)) {
                        if (!client) { 
                            return done(null, false); 
                        }
                        return done(null, client);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
       if (user.type == 'client') {
            model
                .clientModel
                .findClientById(user._id)
                .then(
                    function(client) {
                        if (client) {
                            done(null, client)
                        }
                    },
                    function (err) {
                        done(err, null);
                    });
       }

       if (user.type == 'trainer') {
           model
                .trainerModel
                .findTrainerById(user._id)
                .then(
                    function(trainer){
                        if (trainer) {
                            done(null, trainer);
                        }
                    },
                    function (err){
                        done(err, null);
                    });
       }
    }

    function clientLogin(req, res) {
        var client = req.user;
        res.json(client);
    }

    function checkClientLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function registerClient(req, res) {
        var client = req.body;
        client.password = bcrypt.hashSync(client.password);
        model
            .clientModel
            .createClient(client)
            .then(
                function(client) {
                    if(client) {
                        req.login(client, function(err) {
                            if (err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(client);
                            }
                        })
                    }
                }
            )
    }

    function findClientById(req, res) {
        var clientId = req.params.cid;
        model
            .clientModel
            .findClientById(clientId)
            .then(
                function(client) {
                    if (client) {
                        res.send(client);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    };

    function updateClient(req, res) {
        var client = req.body;
        var clientId = req.params.cid;
        model
            .clientModel
            .updateClient(client, clientId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteClient(req, res) {
        var clientId = req.params.cid;
        model
            .clientModel
            .deleteClient(clientId)
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
        var clientId        = req.body.clientId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        model
            .clientModel
            .uploadImage(clientId, filename)
            .then(
                function(status) {
                    res.redirect('../project/index.html#/clientProfile/'+ clientId);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function favoriteRecipe(req, res) {
        var clientId = req.params.cid;
        var recipeId = req.params.rid;
        model
            .clientModel
            .favoriteRecipe(clientId, recipeId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function unfavoriteRecipe(req, res) {
        var clientId = req.params.cid;
        var recipeId = req.params.rid;
        model
            .clientModel
            .unfavoriteRecipe(clientId, recipeId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function followTrainer(req, res) {
        var clientId = req.params.cid;
        var trainerId = req.params.tid;
        model
            .clientModel
            .followTrainer(clientId, trainerId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function unfollowTrainer(req, res) {
        var clientId = req.params.cid;
        var trainerId = req.params.tid;
        model
            .clientModel
            .unfollowTrainer(clientId, trainerId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function messageClient(req, res) {
        var trainerId = req.params.tid;
        var clientId = req.params.cid;
        var message = req.body;

        model
            .clientModel
            .messageClient(message, trainerId, clientId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        var messageId = req.params.mid;
        var clientId = req.params.cid;

        model
            .clientModel
            .deleteMessage(messageId, clientId)
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