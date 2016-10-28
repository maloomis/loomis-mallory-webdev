(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileClientController", ProfileClientController);

        function ProfileClientController($location, ClientService, $routeParams, $scope) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.saveExercise = saveExercise;
            vm.saveInformation = saveInformation;

            function init() {
                vm.exercises = ["Running", "Biking", "Hiking", "Weights"];
                vm.client = ClientService.findClientById(vm.userId); 
            }
            
            init();
            
            function saveInformation(client){
                client = ClientService.updateClient(client);
                vm.client.exercises = saveExercise();
            }

            function saveExercise(exercise) {
                for (var i = 0; i < vm.exercises.length; i++) {
                    if (vm.exercises[i] == exercise) {
                        return;
                    }
                }
                vm.exercises.push(exercise);
            }
        };
})();