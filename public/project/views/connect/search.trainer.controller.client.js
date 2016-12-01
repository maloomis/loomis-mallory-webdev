(function() {
    angular
        .module("FitnessApp")
        .controller("TrainerSearchController", TrainerSearchController);
        function TrainerSearchController($http, ClientService, $routeParams) {
            var vm = this;
            vm.clientId = $routeParams["cid"];
            vm.init = init;
            vm.searchForTrainers = searchForTrainers;

            init();

            function init() {
                ClientService.findClientById(vm.clientId)
                .success(function(client) {
                    if (client != '0') {
                        vm.client = client;
                        console.log(client)
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve client";
                });
            }

            function searchForTrainers(trainer) {
                console.log(trainer);

            }
        }
})();