module.exports = function(app, model) {
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var auth = authorized;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }))
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '#/user',
        failureRedirect: '#/login'
    }));
    
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.post('/api/user', auth, createUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/', findUserByCredentials);
    app.put('/api/user/:uid', auth, updateUser);
    app.delete('/api/user/:uid', auth, deleteUser);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        if (!user) { 
                            return done(null, false); 
                        }
                        return done(null, user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value: "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function (error) {
                    if (error) {
                        return done(error);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user,done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                }, 
                function (error) {
                    done(error, null);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.sendStatus(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                }
            )
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
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