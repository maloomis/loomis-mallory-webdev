(function() {
    angular
        .module("FitnessApp")
        .controller("RegisterUserController", RegisterUserController);

        function RegisterUserController($location, ClientService, TrainerService) {
            var vm = this;
            vm.registerUser = registerUser;

            function registerUser(user, userType) {
                if (userType == "Trainer") {
                    registerTrainer(user);
                }
                if (userType == "Client") {
                    registerClient(user);
                }
            }

            function registerClient(client) {
                vm.submitted = true;
                vm.passwordMatch = false;

                if (!client) {
                    return;
                }
                
                if (client.password == client.verifyPassword) {
                    vm.passwordMatch = true;
                }

                if (!vm.passwordMatch) {
                    return;
                }

                var promise = ClientService
                                    .registerClient(client)
                                    .then(
                                        function(response) {
                                            var client = response.data;
                                            $location.url("/clientProfile/" + client._id);
                                        });
            }

            function registerTrainer(trainer) {
                vm.submitted = true;
                vm.passwordMatch = false;

                if (!trainer) {
                    return;
                }
                
                if (trainer.password == trainer.verifyPassword) {
                    vm.passwordMatch = true;
                }

                if (!vm.passwordMatch) {
                    return;
                }

                var promise = TrainerService
                                    .registerTrainer(trainer)
                                    .then(
                                        function(response) {
                                            var trainer = response.data;
                                            $location.url("/trainerProfile/" + trainer._id);
                                        });
            }
        }
})();