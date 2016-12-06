(function() {
    angular
        .module("FitnessApp")
        .controller("ClientReplyController", ClientReplyController);
        
        function ClientReplyController($routeParams, ClientService, TrainerService, $location) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.clientId = $routeParams['cid'];
            vm.messageTrainer = messageTrainer;

            function init() {
                ClientService.findClientById(vm.clientId)
                    .success(function(client){
                        if (client) {
                            vm.client = client;
                        }
                    })
                    .error(function (err){
                        vm.error = err;
                    })
            }

            init();

            function messageTrainer(message) {
                TrainerService.messageTrainer(message, vm.clientId, vm.trainerId)
                    .success(function(response) {
                        $location.url("/client/" + vm.clientId + "/messages");
                    })
                    .error(function(err){
                        vm.error = "Could not send client message";
                    })
            }
        }
})();