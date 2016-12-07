(function() {
    angular
        .module("FitnessApp")
        .controller("ClientSearchController", ClientSearchController);
        function ClientSearchController($http, ClientService, $routeParams, TrainerService, $location) {
            var vm = this;
            vm.trainerId = $routeParams["tid"];
            vm.init = init;
            vm.searchForClients = searchForClients;
            vm.viewClientProfile = viewClientProfile;
            vm.logout = logout;

            init();

            function init() {
                TrainerService.findTrainerById(vm.trainerId)
                    .success(function(trainer) {
                        if (trainer != '0') {
                            vm.trainer= trainer;
                        }
                    })
                    .error (function() {
                        vm.error = "Could not retrieve trainer";
                    });
                
                ClientService.findClients()
                    .success(function(clients){
                        if(clients != '0') {
                            vm.clients = clients;
                        }
                    })
                    .error (function(){
                        vm.error = "Could not retrieve clients";
                    })
            }

            function searchForClients(client) {
                ClientService.findClientsByName(client)
                    .success(function(clients){
                        if (clients != '0') {
                            vm.clients = clients;
                        }
                    })
                    .error(function(){
                        vm.error = "Could not find any client";
                    })
            }

            function viewClientProfile(clientId) {
                $location.url(vm.trainerId + "/profileClientConnect/" + clientId)
            }

            function logout() {
                TrainerService.trainerLogout()
                    .success(function(){
                        $location.url("/trainerLogin");
                    });
            }
        }
})();