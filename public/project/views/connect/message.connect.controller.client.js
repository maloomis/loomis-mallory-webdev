(function() {
    angular
        .module("FitnessApp")
        .controller("MessageController", MessageController);
        
        function MessageController($http, ClientService, $routeParams, TrainerService, WorkoutService) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.trainerId = $routeParams['tid'];
            vm.init = init;
            vm.messageTrainer = messageTrainer;

            console.log(vm.clientId);

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

            function messageTrainer(message, clientId, trainerId) {
                TrainerService.messageTrainer(message, clientId, trainerId)
                    .success(

                    )
                    .error(

                    )
            }
        }
            
})();