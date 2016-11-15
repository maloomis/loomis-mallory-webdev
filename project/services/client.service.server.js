module.exports = function(app, model) {
    app.post('/api/client', createClient);
    app.get('/api/client/:uid', findClientById);
    app.get('/api/client/', findClientByCredentials);
    app.put('/api/user/:uid', updateClient);
    app.delete('/api/user/:uid', deleteClient);

    function createClient(req, res) {
        var client = req.body;
        console.log(client);
        model
            .clientModel
            .createClient(client)
            .then(
                function(newClient) {
                    console.log(newClient);
                    res.send(newClient);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findClientByCredentials(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .clientModel
            .findClientByCredentials(username, password)
            .then(
                function(clients) {
                    console.log(clients);
                    if (clients[0]) {
                        console.log(clients[0]);
                        res.json(clients[0]);
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

    function findClientById(req, res) {
        var userId = req.params.uid;
        for (var u in users) {
            if (users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    };

    function updateClient(req, res) {
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

    function deleteClient(req, res) {
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