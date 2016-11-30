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
            id: recipe.id,
            title: recipe.title
        });
    }

    function findRecipeById(recipeId) {
        return RecipeModel.findOne({'id': recipeId}).populate('comments.client').exec();
    }

    function addCommentToRecipe(recipe, clientId) {
        var comment = {
            comment: recipe.comment,
            client: clientId
        }
        return RecipeModel.update(
            {
                id: recipe.id
            }, 
            {
                "$push" : {"comments" : comment }
            }
        );
    }
}
