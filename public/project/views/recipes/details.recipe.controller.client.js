(function() {
    angular
        .module("FitnessApp")
        .controller("RecipeDetailsController", RecipeDetailsController);
        
        function RecipeDetailsController($http, $routeParams, ClientService, RecipeService, $location) {
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
            vm.favoriteRecipe = favoriteRecipe;
            vm.unfavoriteRecipe = unfavoriteRecipe;

            init();

            function init() {
                vm.recipeUnfavorited = true;  

                RecipeService.findRecipeById(vm.recipeId)
                    .success(function(recipe) {
                        if (recipe != '0') {
                            vm.recipe_id = recipe._id;
                            vm.comments = recipe.comments;
                        }
                    })
                    .error (function() {
                        vm.error = "Could not retrieve client";
                    });

                ClientService.findClientById(vm.clientId)
                    .success(function(client) {
                        if (client != '0') {
                            vm.client = client;

                            for (var i = 0; i < vm.client.favoriteRecipes.length; i++) {
                                if (vm.client.favoriteRecipes[i]._id == vm.recipe_id) {
                                    vm.recipeFavorited = true;
                                    vm.recipeUnfavorited = false;
                                    break;
                                }
                            }
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

            function leaveComment(r, clientId) {
                vm.submitted = true;

                if (!r.comment) {
                    return;
                }

                vm.submitted = false;
                r.id = vm.recipe.id
                RecipeService.findRecipeById(r.id)
                    .success(function(recipe){
                        if (recipe != '0') {
                            RecipeService.addCommentToRecipe(r, clientId)
                                .success(function(recipe){
                                    if (recipe) {
                                        vm.comments = recipe.comments;
                                    }
                                })
                                .error(function(error) {
                                    vm.error = "Could not add comment";
                                })
                        } else {
                            RecipeService.createRecipe(r)
                                .success(function(recipe){
                                    if (recipe != '0') {
                                        RecipeService.addCommentToRecipe(r, clientId)
                                            .success(function(recipe){
                                                if (recipe) {
                                                    vm.comments = recipe.comments;
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

            function favoriteRecipe(r) {
                RecipeService.findRecipeById(vm.recipeId)
                    .success(function(recipe){
                        if (recipe != '0') {
                            ClientService.favoriteRecipe(recipe._id, vm.clientId)
                                .success(function(response){
                                    vm.recipeFavorited = true;
                                    vm.recipeUnfavorited = false;
                                })
                                .error(function(error) {
                                    vm.error = "Could not favorite recipe";
                                })
                        } else {
                            RecipeService.createRecipe(r)
                                .success(function(recipe) {
                                    if (recipe != '0') {
                                        ClientService.favoriteRecipe(recipe._id, vm.clientId)
                                            .success(function(response){
                                                vm.recipeFavorited = true;
                                                vm.recipeUnfavorited = false;
                                            })
                                            .error(function(error){
                                                vm.error = "Could not favorite recipe";
                                            })
                                    }
                                })
                                .error(function(error){
                                    vm.error = "Could not favorite recipe";
                                })
                        }
                    })
                    .error(function(error){
                        vm.error = "Could not favorite recipe";
                    })
            }

            function unfavoriteRecipe() {
                ClientService.unfavoriteRecipe(vm.clientId, vm.recipe_id)
                    .success(function(response){
                        vm.recipeFavorited = false;
                        vm.recipeUnfavorited = true;
                    })
                    .error(function(error){
                        vm.error = "Could not unfavorite recipe";
                    })
            }
        }
})();