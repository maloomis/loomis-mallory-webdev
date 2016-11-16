(function() {
    angular
        .module("FitnessApp")
        .controller("RecipeDetailsController", RecipeDetailsController);
        
        function RecipeDetailsController($http, $routeParams) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.recipeId = $routeParams["rid"];
            vm.init = init;
            vm.mainTab = mainTab;
            vm.ingredientsTab = ingredientsTab;
            vm.instructionsTab = instructionsTab;
            vm.nutritionTab = nutritionTab;
            vm.commentTab = commentTab;

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

            function mainTab() {
                $('.active').removeClass('active');
                $('#main').addClass('active');
            }

            function ingredientsTab() {
                $('.active').removeClass('active');
                $('#ingredients').addClass('active');
            }

            function instructionsTab() {
                $('.active').removeClass('active');
                $('#instructions').addClass('active');
            }

            function nutritionTab() {
                $('.active').removeClass('active');
                $('#nutrition').addClass('active');
            }

            function commentTab() {
                $('.active').removeClass('active');
                $('#comment').addClass('active');
            }
        }
})();