(function () {
    angular
        .module("FitnessApp", ['ngRoute'])
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
        .when("/register", {
            templateUrl: "views/user/register.user.view.client.html",
            controller: "RegisterUserController",
            controllerAs: "model"
        })
        .when("/clientLogin", {
            templateUrl: "views/client/login.client.view.client.html",
            controller: "LoginClientController",
            controllerAs: "model"
        })
        .when("/clientProfile/:cid", {
            templateUrl: "views/client/profile.client.view.client.html",
            controller: "ProfileClientController",
            controllerAs: "model"
        })
        .when("/trainerLogin", {
            templateUrl: "views/trainer/login.trainer.view.client.html",
            controller: "LoginTrainerController",
            controllerAs: "model"
        })
        .when("/trainerProfile/:tid", {
            templateUrl: "views/trainer/profile.trainer.view.client.html",
            controller: "ProfileTrainerController",
            controllerAs: "model"
        })
        .when("/:cid/searchRecipe", {
            templateUrl: "views/recipes/search.recipe.view.client.html",
            controller: "RecipeSearchController",
            controllerAs: "model"
        })
        .when("/:cid/detailsRecipe/:rid", {
            templateUrl: "views/recipes/details.recipe.view.client.html",
            controller: "RecipeDetailsController",
            controllerAs: "model"
        })
        .when("/:cid/searchTrainer", {
            templateUrl: "views/connect/search.trainer.view.client.html",
            controller: "TrainerSearchController",
            controllerAs: "model"
        })
        .when("/:tid/createWorkout", {
            templateUrl: "views/workouts/createWorkouts.view.client.html",
            controller: "CreateWorkoutsController",
            controllerAs: "model"
        })
        .when("/:cid/profileTrainerConnect/:tid", {
            templateUrl: "views/connect/profile.trainer.connect.view.client.html",
            controller: "ProfileTrainerConnectController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/clientLogin"
        });

    }
})();