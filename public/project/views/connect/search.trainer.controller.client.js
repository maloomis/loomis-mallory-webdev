(function() {
    angular
        .module("FitnessApp")
        .controller("TrainerSearchController", TrainerSearchController);
        function TrainerSearchController($http, ClientService, $routeParams) {
            var vm = this;
            vm.clientId = $routeParams["cid"];
            vm.init = init;
            vm.searchTrainerByName = searchTrainerByName;

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
            }

            function searchTrainerByName(name) {

            }
        }
})();