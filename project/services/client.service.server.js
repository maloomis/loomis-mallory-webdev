module.exports = function(app, model) {
    app.post('/api/client', createClient);
    app.get('/api/client/:cid', findClientById);
    app.get('/api/client/', findClientByCredentials);
    app.put('/api/client/:cid', updateClient);
    app.delete('/api/client/:cid', deleteClient);

    function createClient(req, res) {
        var client = req.body;
        model
            .clientModel
            .createClient(client)
            .then(
                function(newClient) {
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
                    if (clients[0]) {
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
        var clientId = req.params.cid;
        model
            .clientModel
            .findClientById(clientId)
            .then(
                function(client) {
                    if (client) {
                        res.send(client);
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
}