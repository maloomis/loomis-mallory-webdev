module.exports = function() {
    var mongoose = require("mongoose");
    var RecipeSchema = require("./recipe.schema.server.js")();
    var RecipeModel = mongoose.model('RecipeModel', RecipeSchema);

    var api = {
        createRecipe: createRecipe,
        findRecipeById: findRecipeById,
        updateRecipe: updateRecipe
    };
    return api;

    function createRecipe(client) {
        return ClientModel.create(client);
    }

    function findRecipeById(clientId) {
        return ClientModel.findById(clientId);
    }

    function updaterecipe(client, clientId) {
        return ClientModel.update(
            {
                _id: clientId
            }, 
            {
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                weight: client.weight,
                heightFeet: client.heightFeet, 
                heightInches: client.heightInches,
                fitnessGoal: client.fitnessGoal,  
            }
        );
    }
}
