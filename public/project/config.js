(function () {
    angular
        .module("FitnessApp", ['ngRoute'])
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
        .when("/clientLogin", {
            templateUrl: "views/client/login.client.view.client.html",
            controller: "LoginClientController",
            controllerAs: "model"
        })
        .when("/clientRegister", {
            templateUrl: "views/client/register.client.view.client.html",
            controller: "RegisterClientController",
            controllerAs: "model"
        })
        .when("/clientProfile/:uid", {
            templateUrl: "views/client/profile.client.view.client.html",
            controller: "ProfileClientController",
            controllerAs: "model"
        })
        .when("/trainerLogin", {
            templateUrl: "views/trainer/login.trainer.view.client.html",
            controller: "LoginTrainerController",
            controllerAs: "model"
        })
        .when("/trainerRegister", {
            templateUrl: "views/trainer/register.trainer.view.client.html",
            controller: "RegisterTrainerController",
            controllerAs: "model"
        })
        .when("/trainerProfile", {
            templateUrl: "views/trainer/profile.trainer.view.client.html",
            controller: "ProfileTrainerController",
            controllerAs: "model"
        })
        .when("/:uid/searchRecipe", {
            templateUrl: "views/recipes/search.recipe.view.client.html",
            controller: "RecipeSearchController",
            controllerAs: "model"
        })
        .when("/:uid/detailsRecipe/:rid", {
            templateUrl: "views/recipes/details.recipe.view.client.html",
            controller: "RecipeDetailsController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/clientLogin"
        })
    }
})();