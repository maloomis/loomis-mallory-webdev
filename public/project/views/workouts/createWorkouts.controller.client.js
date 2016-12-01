(function() {
    angular
        .module("FitnessApp")
        .controller("CreateWorkoutsController", CreateWorkoutsController);

        function CreateWorkoutsController($location, TrainerService, $routeParams, WorkoutService) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.createWorkout = createWorkout;

            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                    .success(function(trainer){
                        vm.trainer = trainer;
                    })
                    .error(function(err){
                        vm.error = "Could not retrieve trainer";
                    })
            }
            init();

            function createWorkout(workout) {
                WorkoutService.createWorkout(vm.trainerId, workout)
                    .success(function(response){
                        location.reload();
                    })
                    .error(function(err){
                        vm.error = "Could not create workout";
                    })
            }
        }
})();