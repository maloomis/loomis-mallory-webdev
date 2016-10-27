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
            controller: "LoginClientController",
            controllerAs: "model"
        })
        .when("/trainerLogin", {
            templateUrl: "views/trainer/login.trainer.view.client.html",
            controller: "LoginTrainerController",
            controllerAs: "model"
        })
        .when("/trainerRegister", {
            templateUrl: "views/trainer/register.trainer.view.client.html",
            controller: "LoginClientController",
            controllerAs: "model"
        })
        .otherwise({
            redirectTo: "/clientLogin"
        })
    }
})();