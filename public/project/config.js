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
            controllerAs: "model",
            resolve: {
                checkClientLogin: checkClientLogin
            }
        })
        .when("/trainerLogin", {
            templateUrl: "views/trainer/login.trainer.view.client.html",
            controller: "LoginTrainerController",
            controllerAs: "model"
        })
        .when("/trainerProfile/:tid", {
            templateUrl: "views/trainer/profile.trainer.view.client.html",
            controller: "ProfileTrainerController",
            controllerAs: "model",
            resolve: {
                checkTrainerLogin: checkTrainerLogin
            }
        })
        .when("/trainerProfile", {
            templateUrl: "views/trainer/profile.trainer.view.client.html",
            controller: "ProfileTrainerController",
            controllerAs: "model",
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
            templateUrl: "views/client/searchTrainer.client.view.client.html",
            controller: "TrainerSearchController",
            controllerAs: "model"
        })
        .when("/:tid/createWorkout", {
            templateUrl: "views/workouts/createWorkouts.view.client.html",
            controller: "CreateWorkoutsController",
            controllerAs: "model"
        })
        .when("/:cid/profileTrainerConnect/:tid", {
            templateUrl: "views/client/trainerProfile.client.view.client.html",
            controller: "TrainerProfileClientController",
            controllerAs: "model"
        })
        .when("/trainer/:tid/messages", {
            templateUrl: "views/trainer/messages.trainer.view.client.html",
            controller: "TrainerMessageController",
            controllerAs: "model"
        })
        .when("/:tid/replyToClient/:cid", {
            templateUrl: "views/trainer/replyToClient.trainer.view.client.html",
            controller: "TrainerReplyController",
            controllerAs: "model"
        })
        .when("/client/:cid/messages", {
            templateUrl: "views/client/messages.client.view.client.html",
            controller: "ClientMessageController",
            controllerAs: "model"
        })
        .when("/:cid/replyToTrainer/:tid", {
            templateUrl: "views/client/replyToTrainer.client.view.client.html",
            controller: "ClientReplyController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/clientLogin"
        });
    }

    function checkClientLogin($q, ClientService, $location) {
            var deferred = $q.defer();
            ClientService
                .checkLogin()
                .success(
                    function (user) {
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
    
    function checkTrainerLogin($q, TrainerService, $location) {
            var deferred = $q.defer();
            TrainerService
                .checkTrainerLogin()
                .success(
                    function (trainer) {
                        if (trainer != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
})();