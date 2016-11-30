module.exports = function(app, model) {
    app.post('/api/recipe', createRecipe);
    app.get('/api/recipe/:rid', findRecipeById);
    app.put('/api/client/:cid/recipe/:rid', addCommentToRecipe);

    function createRecipe(req, res) {
        var recipe = req.body;
        console.log(recipe);
        model
            .recipeModel
            .createRecipe(recipe)
            .then(
                function(newRecipe) {
                    console.log(newRecipe);
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
                    console.log(recipe);
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

    function addCommmentToRecipe(req, res) {
        var comment = req.body;
        var clientId = req.params.cid;
        var recipeId = req.params.rid;

        console.log(comment);
        console.log(clientId);
        console.log(recipeId);

        model
            .recipeModel
            .addCommentToRecipe(comment, clientId, recipeId)
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