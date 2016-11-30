(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileTrainerController", ProfileTrainerController);

        function ProfileTrainerController($location, TrainerService, $routeParams) {
            var vm = this;
            vm.trainerId = $routeParams["tid"];
            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                .success(function(trainer) {
                    if (trainer != '0') {
                        vm.trainer = trainer;
                        console.log(vm.trainer);
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve trainer";
                });               
            }
            
            init();
        }
})();