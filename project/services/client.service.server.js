module.exports = function(app) {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice", email:"loomis.m@husky.neu.edu",  
            lastName: "Wonder", weight: 123, heightFeet: 5, heightInches: 5, 
            workouts: [{ name: 'Running',    selected: true },
                        { name: 'Biking',   selected: false },
                        { name: 'Hiking',     selected: true },
                        { name: 'Weights', selected: false }], city: "Windham", state: "New Hampshire", goals: ["lose weight"]},
        ];

    app.post('/api/client', createClient);
    app.get('/api/client', findUserByUsername);
    app.get('/api/client/:uid', findUserById);
    app.get('/api/client/', findUserByCredentials);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

            function createUser(client) {
            var url = '/api/client';
            return $http.post(url, client);
        };

        function deleteClient(clientId) {
            var url = '/api/client/' + clientId;
            return $http.delete(url);
        };

        function findClientByCredentials(username, password) {
            var url = '/api/client/?username=' + username + '&password=' + password;
            return $http.get(url);
        };

        function findClientById(userId) {
            var url = '/api/client/' + userId;
            return $http.get(url);
        };

        function updateClient(client) {
            var url = "/api/client/" + user._id;
            return $http.put(url, user);
        };

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