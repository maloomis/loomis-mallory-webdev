(function() {
    angular
        .module("FitnessApp")
        .controller("TrainerReplyController", TrainerReplyController);
        
        function TrainerReplyController($routeParams, ClientService, TrainerService, $location) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.clientId = $routeParams['cid'];
            vm.messageClient = messageClient;
            vm.logout = logout;

            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                    .success(function(trainer){
                        if (trainer) {
                            vm.trainer = trainer;
                        }
                    })
                    .error(function (err){
                        vm.error = err;
                    })
            }

            init();

            function messageClient(message) {
                vm.submitted = true;

                if (!message) {
                    return;
                }

                vm.submitted = false;
                ClientService.messageClient(message, vm.clientId, vm.trainerId)
                    .success(function(response) {
                        $location.url("trainer/" + vm.trainerId + "/messages");
                    })
                    .error(function(err){
                        vm.error = "Could not send client message";
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