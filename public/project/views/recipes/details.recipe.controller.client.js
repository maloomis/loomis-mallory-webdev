(function() {
    angular
        .module("FitnessApp")
        .controller("RecipeDetailsController", RecipeDetailsController);
        
        function RecipeDetailsController($http, $routeParams, ClientService, RecipeService) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.recipeId = $routeParams["rid"];
            vm.init = init;
            vm.mainTab = mainTab;
            vm.ingredientsTab = ingredientsTab;
            vm.instructionsTab = instructionsTab;
            vm.nutritionTab = nutritionTab;
            vm.commentTab = commentTab;
            vm.leaveComment = leaveComment;

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

            function leaveComment(comment, clientId) {
                RecipeService.findRecipeById(vm.recipe.id)
                    .success(function(recipe){
                        console.log(recipe);
                        if (recipe != '0') {
                            RecipeService.addCommentToRecipe(vm.recipe.id, comment, clientId)
                                .success(function(comments){
                                    if (comments) {
                                        vm.comments = comments;
                                    }
                                })
                                .error(function(error) {
                                    vm.error = "Could not add comment";
                                })
                        } else {
                            RecipeService.createRecipe(vm.recipe)
                                .success(function(recipe){
                                    if (recipe != '0') {
                                        RecipeService.addCommentToRecipe(recipe.id, comment, clientId)
                                            .success(function(comments){
                                                if(comments != '0') {
                                                    vm.comments = comments;
                                                }
                                            })
                                            .error(function(error){
                                                vm.error = "Could not add comment";
                                            })
                                    }
                                })
                                .error(function(error){
                                    vm.error = "Could not create recipe";
                                })
                        }
                    })
                    .error(function(error){
                        vm.error = "Could not add comment";
                    });
            }
        }
})();