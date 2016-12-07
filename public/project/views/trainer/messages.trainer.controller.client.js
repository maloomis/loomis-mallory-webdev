(function() {
    angular
        .module("FitnessApp")
        .controller("TrainerMessageController", TrainerMessageController);
        
        function TrainerMessageController($route, $routeParams, ClientService, TrainerService, $location) {
            var vm = this;
            vm.trainerId = $routeParams['tid'];
            vm.deleteMessage = deleteMessage;
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

            function deleteMessage(messageId) {
                TrainerService.deleteMessage(messageId, vm.trainerId)
                    .success(function(status){
                        $route.reload();
                    })
                    .error(function(err){
                        vm.error = "Could not delete message";
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