(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileClientConnectController", ProfileClientConnectController);
        
        function ProfileClientConnectController($route, $http, ClientService, $routeParams, TrainerService, WorkoutService, $location) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.trainerId = $routeParams['tid'];
            vm.messageClient = messageClient;
            vm.logout = logout;

            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                    .success(function(trainer){
                        if (trainer) {
                            vm.trainer = trainer;
                        }
                    })
                    .error(function(err) {
                        vm.error = "Could not retrieve trainer";
                    })

                ClientService.findClientById(vm.clientId)
                    .success(function(client) {
                        if (client != '0') {
                            vm.client = client;
                        }
                    })
                    .error (function() {
                        vm.error = "Could not retrieve client";
                    });  
            }
            init();

            function messageClient(message) {
                vm.submitted = true;

                if (!message) {
                    return;
                }

                vm.submitted = false;
                ClientService.messageClient(message, vm.clientId, vm.trainerId)
                    .success(function(status) {
                        $route.reload();
                    })
                    .error(function(err) {
                        vm.error = err;
                    });
            }

            function logout() {
                TrainerService.trainerLogout()
                    .success(function(){
                        $location.url("/trainerLogin");
                    });
            }
        }
            
})();