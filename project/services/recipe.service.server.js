module.exports = function(app, model) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe/:rid', findRecipeById);
    app.put('/api/recipe/:rid', updateRecipe);

    function createRecipe(req, res) {
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

    function findRecipeById(req, res) {
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

    function updateRecipe(req, res) {
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
}