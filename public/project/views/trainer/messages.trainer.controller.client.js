(function() {
    angular
        .module("FitnessApp")
        .controller("MessageController", MessageController);
        
        function MessageController($routeParams, ClientService, TrainerService) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.deleteMessage = deleteMessage;

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

            function deleteMessage(messageId) {
                TrainerService.deleteMessage(messageId)
                    .success(function(status){
                        console.log(status);
                    })
                    .error(function(err){
                        vm.error = "Could not delete message";
                    })
                console.log(messageId);
            }
        }
})();