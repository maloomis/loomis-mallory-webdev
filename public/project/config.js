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
                checkLogin: checkLogin
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
                checkLogin: checkLogin
            }
        })
        .when("/:cid/searchRecipe", {
            templateUrl: "views/recipes/search.recipe.view.client.html",
            controller: "RecipeSearchController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:cid/detailsRecipe/:rid", {
            templateUrl: "views/recipes/details.recipe.view.client.html",
            controller: "RecipeDetailsController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:cid/searchTrainer", {
            templateUrl: "views/client/searchTrainer.client.view.client.html",
            controller: "TrainerSearchController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:tid/createWorkout", {
            templateUrl: "views/workouts/createWorkouts.view.client.html",
            controller: "CreateWorkoutsController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:cid/profileTrainerConnect/:tid", {
            templateUrl: "views/client/trainerProfile.client.view.client.html",
            controller: "TrainerProfileClientController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/trainer/:tid/messages", {
            templateUrl: "views/trainer/messages.trainer.view.client.html",
            controller: "TrainerMessageController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:tid/replyToClient/:cid", {
            templateUrl: "views/trainer/replyToClient.trainer.view.client.html",
            controller: "TrainerReplyController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/client/:cid/messages", {
            templateUrl: "views/client/messages.client.view.client.html",
            controller: "ClientMessageController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .when("/:cid/replyToTrainer/:tid", {
            templateUrl: "views/client/replyToTrainer.client.view.client.html",
            controller: "ClientReplyController",
            controllerAs: "model",
            resolve: {
                checkLogin: checkLogin
            }
        })
        .otherwise({
            redirectTo: "/clientLogin"
        });
    }

    function checkLogin($q, ClientService, $location, TrainerService) {
            var deferred = $q.defer();
            if ($location.$$path.includes('client') || $location.$$path.includes('Recipe') || $location.$$path.includes('Trainer') ) {
                    ClientService
                        .checkClientLogin()
                        .success(function (client){
                            if (client != '0') {
                                deferred.resolve();
                                return deferred.promise;
                            } else {
                                deferred.reject();
                                $location.url('/clientLogin');
                                return deferred.promise;
                            }
                        })
            }

            if ($location.$$path.includes('trainer') || $location.$$path.includes('createWorkout') || $location.$$path.includes('replyToClient')) {
                    TrainerService
                        .checkTrainerLogin()
                        .success(function (trainer){
                            if (trainer != '0') {
                                deferred.resolve();
                                return deferred.promise;
                            } else {
                                deferred.reject();
                                $location.url('/trainerLogin');
                                return deferred.promise;
                            }
                        })
            }
        }
})();