(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileTrainerController", ProfileTrainerController);

        function ProfileTrainerController($location, TrainerService, $routeParams, WorkoutService) {
            var vm = this;
            vm.trainerId = $routeParams["tid"];
            vm.saveInformation = saveInformation;
            vm.uploadTab = uploadTab;
            vm.informationTab = informationTab;
            vm.deleteTrainer = deleteTrainer;

            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                .success(function(trainer) {
                    if (trainer != '0') {
                        vm.trainer = trainer;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve trainer";
                });

                                
                WorkoutService.findWorkoutsForTrainer(vm.trainerId)
                    .success(function(workouts){
                        if (workouts) {
                            vm.workouts = workouts;
                        }
                    }) 
                    .error(function(){
                        vm.error = "Could not retrieve workouts";
                    })              
            }
            init();

            function saveInformation(trainer) {
                TrainerService.updateTrainer(trainer)
                    .success(function(status) {
                            if (status === '0') {
                                vm.error = "Could not update trainer.";
                            } else {
                                $location.url("/trainerProfile/" + vm.trainerId);
                            }
                        });
            }

            function deleteTrainer() {
                TrainerService.deleteTrainer(vm.trainerId)
                    .success(function(response) {
                        $location.url("/clientLogin");
                    });
            }

            function uploadTab() {
                $('.active').removeClass('active');
                $('#upload').addClass('active');
            }

            function informationTab() {
                $('.active').removeClass('active');
                $('#information').addClass('active');
            }
        }
})();