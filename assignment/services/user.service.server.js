module.exports = function(app) {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;
    
    var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: ObjectId, ref: 'Website'}],
    dateCreated: { type: Date, default: Date.now}
    });
    var UserModel = mongoose.model('Users', UserSchema);

    app.post('/api/user', createUser);
    app.get('/api/user', findUserByUsername);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/', findUserByCredentials);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        UserModel
            .create(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserByUsername(req, res) {
        UserModel
            .find(
                function () {
                                        for (var u in users) {
                        if (users[u].username == username) {
                            res.json(users[u]);
                        }
                    }

                }
            )
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    };

    function findUserByCredentials(req,res) {
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

    function findUserById(req, res) {
        var userId = req.params.uid;
        UserModel
            .findById(userId)
            .then(
                function(user) {
                    res.status(200).json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    };

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        UserModel
            .findOneAndUpdate({_id: uid}, {$set:{
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }}, 
            {new: true}, 
            function(err, user) {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).json(user);
                }
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        UserModel
            .remove({_id: uid})
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function() {
                    res.sendStatus(400);
                }
            );
    }
}