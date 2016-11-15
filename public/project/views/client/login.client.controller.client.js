(function() {
    angular
        .module("FitnessApp")
        .controller("LoginClientController", LoginClientController);

        function LoginClientController($location, ClientService) {
            var vm = this;
            vm.login = login;

            function login(client) {
                var promise = ClientService.findClientByCredentials(client.username, client.password);
                promise.success(function(client) {
                        if (client === '0') {
                            vm.error = "No such client";
                        } else {
                            $location.url("/clientProfile/" + client._id);
                        }
                    });
            }
        }
})();