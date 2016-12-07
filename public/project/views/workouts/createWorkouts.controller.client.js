(function() {
    angular
        .module("FitnessApp")
        .controller("CreateWorkoutsController", CreateWorkoutsController);

        function CreateWorkoutsController($location, TrainerService, $routeParams, WorkoutService) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.createWorkout = createWorkout;
            vm.logout = logout

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
                vm.submitted = true;

                if (!workout) {
                    return;
                }

                if (!workout.name) {
                    return;
                }

                vm.submitted = false;
                WorkoutService.createWorkout(vm.trainerId, workout)
                    .success(function(response){
                        location.reload();
                    })
                    .error(function(err){
                        vm.error = "Could not create workout";
                    })
            }
                
            function logout() {
                TrainerService.trainerLogout()
                    .success(function(){
                        $location.url("/trainerLogin");
                    });
            }
        }
})();