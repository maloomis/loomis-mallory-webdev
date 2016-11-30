module.exports = function(app, model) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe/:rid', findRecipeById);
    app.put('/api/client/:cid/recipe', addCommentToRecipe);

    function createRecipe(req, res) {
        var recipe = req.body;
        model
            .recipeModel
            .createRecipe(recipe)
            .then(
                function(newRecipe) {
                    res.send(newRecipe);
                },
                function(err) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRecipeById(req, res) {
        var recipeId = req.params.rid;
        model
            .recipeModel
            .findRecipeById(recipeId)
            .then(
                function(recipe) {
                    if (recipe) {
                        res.send(recipe);
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

    function addCommentToRecipe(req, res) {
        var recipe = req.body;
        var clientId = req.params.cid;
        model
            .recipeModel
            .addCommentToRecipe(recipe, clientId)
            .then(
                function (status) {
                    model
                        .recipeModel
                        .findRecipeById(recipe.id)
                        .then(
                            function(recipe) {
                                if (recipe) {
                                    res.send(recipe);
                                }
                                else {
                                    res.send('0');
                                }
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        )
                },
                function(err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
}