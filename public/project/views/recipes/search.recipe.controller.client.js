(function() {
    angular
        .module("FitnessApp")
        .controller("RecipeSearchController", RecipeSearchController);
        function RecipeSearchController($http, ClientService, $routeParams) {
            var vm = this;
            vm.clientId = $routeParams["cid"];
            vm.init = init;
            vm.searchRecipeByName = searchRecipeByName;

            init();

            function init() {
                ClientService.findClientById(vm.clientId)
                .success(function(client) {
                    if (client != '0') {
                        vm.client = client;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve client";
                });
            }

            function searchRecipeByName(name) {
                var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=20&query=" + name;
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