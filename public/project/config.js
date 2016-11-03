(function () {
    angular
        .module("FitnessApp", ['ngRoute'])
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
        .when("/clientLogin", {
            templateUrl: "views/client/login.client.view.client.html",
            controller: "LoginclientController",
            controllerAs: "model"
        })
        .when("/clientRegister", {
            templateUrl: "views/client/register.client.view.client.html",
            controller: "RegisterclientController",
            controllerAs: "model"
        })
        .when("/clientProfile/:uid", {
            templateUrl: "views/client/profile.client.view.client.html",
            controller: "ProfileclientController",
            controllerAs: "model"
        })
        .when("/trainerLogin", {
            templateUrl: "views/trainer/login.trainer.view.client.html",
            controller: "LogintrainerController",
            controllerAs: "model"
        })
        .when("/trainerRegister", {
            templateUrl: "views/trainer/register.trainer.view.client.html",
            controller: "RegisterTrainerController",
            controllerAs: "model"
        })
        .when("/trainerProfile", {
            templateUrl: "views/trainer/profile.trainer.view.client.html",
            controller: "ProfiletrainerController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/clientLogin"
        })
    }
})();