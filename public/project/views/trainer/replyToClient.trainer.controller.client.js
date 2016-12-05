(function() {
    angular
        .module("FitnessApp")
        .controller("ReplyController", ReplyController);
        
        function ReplyController($routeParams, ClientService, TrainerService, $location) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.clientId = $routeParams['cid'];
            vm.messageClient = messageClient;

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
                ClientService.messageClient(message, vm.clientId, vm.trainerId)
                    .success(function(response) {
                        $location.url(vm.trainerId + "/messages");
                    })
                    .error(function(err){
                        vm.error = "Could not send client message";
                    })
            }
        }
})();