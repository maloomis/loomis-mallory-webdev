(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileClientController", ProfileClientController);

        function ProfileClientController($location, ClientService, $routeParams, $scope) {
            var vm = this;
            vm.clientId = $routeParams["cid"];
            vm.saveInformation = saveInformation;
            vm.uploadTab = uploadTab;
            vm.informationTab = informationTab;
            vm.deleteClient = deleteClient;
            vm.logout = logout;

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
            
            init();

            function deleteClient() {
                var promise = ClientService.deleteClient(vm.clientId);
                promise.success(function(response) {
                    $location.url("/login");
                });
            }
        
            function saveInformation(client){
                var promise = ClientService.updateClient(client._id, client);
                promise.success(function(status) {
                        if (status === '0') {
                            vm.error = "Could not update user.";
                        } else {
                            $location.url("/clientProfile/" + vm.client._id);
                        }
                    });
            }

            function uploadTab() {
                $('.active').removeClass('active');
                $('#upload').addClass('active');
            }

            function informationTab() {
                $('.active').removeClass('active');
                $('#information').addClass('active');
            }

            function logout() {
                ClientService.logout()
                    .success(function(){
                        $location.url("/clientLogin");
                    });
            }
        };
})();