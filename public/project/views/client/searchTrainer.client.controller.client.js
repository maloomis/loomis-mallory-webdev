(function() {
    angular
        .module("FitnessApp")
        .controller("TrainerSearchController", TrainerSearchController);
        function TrainerSearchController($http, ClientService, $routeParams, TrainerService, $location) {
            var vm = this;
            vm.clientId = $routeParams["cid"];
            vm.init = init;
            vm.searchForTrainers = searchForTrainers;
            vm.viewTrainerProfile = viewTrainerProfile;

            init();

            function init() {
                ClientService.findClientById(vm.clientId)
                    .success(function(client) {
                        if (client != '0') {
                            vm.client = client;
                        }
                    })
                    .error (function() {
                        vm.error = "Could not retrieve client";
                    });
                
                TrainerService.findTrainers()
                    .success(function(trainers){
                        if(trainers != '0') {
                            console.log(trainers)
                            vm.trainers = trainers;
                        }
                    })
                    .error (function(){
                        vm.error = "Could not retrieve trainers";
                    })
            }

            function searchForTrainers(trainer) {
                TrainerService.findTrainersByName(trainer)
                    .success(function(trainers){
                        if (trainers != '0') {
                            vm.trainers = trainers;
                        }
                    })
                    .error(function(){
                        vm.error = "Could not find any trainers";
                    })
            }

            function viewTrainerProfile(trainerId) {
                $location.url(vm.clientId + "/profileTrainerConnect/" + trainerId)
            }
        }
})();