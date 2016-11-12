module.exports = function(app) {

    /*
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
*/

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
                    res.json(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )

        /*


        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var ID_LENGTH = 8;

        var generate = function() {
            var rtn = '';
            for (var i = 0; i < ID_LENGTH; i++) {
                rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
            }
            return rtn;
        }

        user._id = generate();
        users.push(user);

        if (user) {
            res.send(user);
            return;
        }
        else {
            res.send('0');
        }
        */
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
        /*
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
        */
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
        for (var u in users) {
            if (users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };

    function updateUser(req, res) {
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

    function deleteUser(req, res) {
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