(function() {
    angular
        .module("FitnessApp")
        .controller("ClientMessageController", ClientMessageController);
        
        function ClientMessageController($routeParams, ClientService, TrainerService, $route, $location) {
            var vm = this;
            vm.clientId = $routeParams['cid'];
            vm.deleteMessage = deleteMessage;
            vm.logout = logout;

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

            function deleteMessage(messageId) {
                ClientService.deleteMessage(messageId, vm.clientId)
                    .success(function(status){
                        $route.reload();
                    })
                    .error(function(err){
                        vm.error = "Could not delete message";
                    })
            }

            function logout() {
                ClientService.clientLogout()
                    .success(function(){
                        $location.url("/clientLogin");
                    });
            }
        }
})();