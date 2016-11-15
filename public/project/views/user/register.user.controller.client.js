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
                var promise = ClientService.createClient(client);
                promise.success(function(newClient) {
                    if (newClient) {
                        vm.client = newClient;
                        $location.url("/clientProfile/" + newClient._id);
                    } else {
                        vm.error = "Couldn't create client";
                    }
                });
            }

            function registerTrainer(trainer) {
                var promise = TrainerService.createTrainer(trainer);
                promise.success(function(newTrainer) {
                    if (newTrainer) {
                        vm.trainer = newTrainer;
                        $location.url("/trainerProfile/" + newTrainer._id);
                    } else {
                        vm.error = "Couldn't create trainer";
                    }
                })
            }
        }
})();