(function() {
    angular
        .module("FitnessApp")
        .controller("LoginTrainerController", LoginTrainerController);

        function LoginTrainerController($location, TrainerService) {
            var vm = this;
            vm.login = login;

            function login(trainer) {
                var promise = TrainerService.trainerLogin(trainer);
                promise.success(function(trainer) {
                        if (trainer === '0') {
                            vm.error = "No such trainer";
                        } else {
                            $location.url("/trainerProfile/" + trainer._id);
                        }
                    });
            }
        }
})();