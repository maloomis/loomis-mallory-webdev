module.exports = function() {
    var mongoose = require("mongoose");
    var RecipeSchema = require("./recipe.schema.server.js")();
    var RecipeModel = mongoose.model('RecipeModel', RecipeSchema);

    var api = {
        createRecipe: createRecipe,
        findRecipeById: findRecipeById,
        addCommentToRecipe: addCommentToRecipe
    };
    return api;

    function createRecipe(recipe) {
        return RecipeModel.create({
            id: recipe.id
        });
    }

    function findRecipeById(recipeId) {
        return RecipeModel.findOne({'id': recipeId});
    }

    function addCommentToRecipe(comment, clientId, recipeId) {
        var comment = {
            comment: comment,
            client: clientId
        }
        return RecipeModel.update(
            {
                id: recipe
            }, 
            {
                comments.push(comment);
            }
        );
    }
}
