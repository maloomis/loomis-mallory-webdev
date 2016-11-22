module.exports = function(app, model) {
    /*
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;
    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    */

   // app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/', findUserByCredentials);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

/*
    function localStrategy(username, password, done) {
        var user = req.body;
        var username = user.username;
        var password = user.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    if (users[0]) {
                        if (!users[0]) {
                            return done(null, false);
                        }
                        return done(null, user);
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function login(req, res) {


    }
    */

    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    if (users[0]) {
                        res.json(users[0]);
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

    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        res.send('0');
                    }
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            )
    };

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(user, uid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
}