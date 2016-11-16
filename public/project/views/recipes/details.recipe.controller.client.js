(function() {
    angular
        .module("FitnessApp")
        .controller("RecipeDetailsController", RecipeDetailsController);
        
        function RecipeDetailsController($http, $routeParams) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.recipeId = $routeParams["rid"];
            vm.init = init;

            init();

            function init() {
                var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + vm.recipeId + "/information?includeNutrition=true";
                var config = {headers: {
                        "X-Mashape-Key": "KK8WWHvSogmshmwCpe9OrEHv3KSOp1M1QbIjsnlTToIfiwquvO"
                    }
                };
                $http
                    .get(url, config)
                    .success(function (result) {
                        vm.recipe = result;
                    })
            }
        }
})();