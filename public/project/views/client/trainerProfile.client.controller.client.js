(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileTrainerConnectController", ProfileTrainerConnectController);
        
        function ProfileTrainerConnectController($route, $http, ClientService, $routeParams, TrainerService, WorkoutService, $location) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.trainerId = $routeParams['tid'];
            vm.followTrainer = followTrainer;
            vm.unfollowTrainer = unfollowTrainer;
            vm.messageTrainer = messageTrainer;
            vm.logout = logout;

            function init() {
                vm.trainerUnfollowed = true;
                TrainerService.findTrainerById(vm.trainerId)
                    .success(function(trainer){
                        if (trainer) {
                            vm.trainer = trainer;
                        }
                    })
                    .error(function(err) {
                        vm.error = "Could not retrieve trainer";
                    })
                
                WorkoutService.findWorkoutsForTrainer(vm.trainerId)
                    .success(function(workouts){
                        if (workouts) {
                            vm.workouts = workouts;
                        }
                    }) 
                    .error(function(){
                        vm.error = "Could not retrieve workouts";
                    })

                ClientService.findClientById(vm.clientId)
                    .success(function(client) {
                        if (client != '0') {
                            vm.client = client;
                            for (var i = 0; i < vm.client.trainers.length; i++) {
                                if (vm.client.trainers[i]._id == vm.trainerId) {
                                    vm.trainerFollowed = true;
                                    vm.trainerUnfollowed = false;
                                    break;
                                }
                            }
                        }
                    })
                    .error (function() {
                        vm.error = "Could not retrieve client";
                    });  
            }
            init();

            function followTrainer() {
                ClientService.followTrainer(vm.clientId, vm.trainerId)
                    .success(function(response){
                        vm.trainerFollowed = true;
                        vm.trainerUnfollowed = false;
                    })
                    .error(function(){
                        vm.error("Could not follow trainer");
                    });
            }

            function unfollowTrainer() {
                ClientService.unfollowTrainer(vm.clientId, vm.trainerId)
                    .success(function(response){
                        vm.trainerFollowed = false;
                        vm.trainerUnfollowed = true;

                    })
                    .error(function(){
                        vm.error("Could not follow trainer");
                    });
            }

            function messageTrainer(message) {
                vm.submitted = true;

                if (!message) {
                    return;
                }

                vm.submitted = false;
                TrainerService.messageTrainer(message, vm.clientId, vm.trainerId)
                    .success(function(status) {
                        $route.reload();
                    })
                    .error(function(err) {
                        vm.error = err;
                    });
            }

            function logout() {
                ClientService.clientLogout()
                    .success(function(){
                        $location.url("/clientLogin");
                    });
            }
        }
            
})();