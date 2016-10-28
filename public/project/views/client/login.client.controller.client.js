(function() {
    angular
        .module("FitnessApp")
        .controller("LoginClientController", LoginClientController);

        function LoginClientController($location, ClientService) {
            var vm = this;
            vm.login = login;

            function login(client) {
                var client = ClientService.findClientByCredentials(client.username, client.password);
                $location.url("/clientProfile/" + client._id);
            }
        }
})();