(function () {
    angular
        .module("FitnessApp")
        .factory("RecipeService", RecipeService);
    
    function RecipeService($http) {        
        var api = {
            "createRecipe" : createRecipe,
            "findRecipeById" : findRecipeById,
            "addCommentToRecipe" : addCommentToRecipe
        };

        return api;

        function createRecipe(recipe) {
            console.log(recipe);
            var url = '/api/recipe';
            return $http.post(url, recipe);
        };

        function findRecipeById(recipeId) {
            var url = '/api/recipe/' + recipeId;
            return $http.get(url);
        };

        function addCommentToRecipe(recipeId, comment, clientId) {
            var url = "/api/client/" + clientId + '/recipe/' + recipeId;
            return $http.put(url, comment);
        };
    }
})();