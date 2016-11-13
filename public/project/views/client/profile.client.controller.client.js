(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileClientController", ProfileClientController);

        function ProfileClientController($location, ClientService, $routeParams, $scope) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.saveInformation = saveInformation;
            vm.uploadTab = uploadTab;
            vm.informationTab = informationTab;


            function init() {
                vm.exercises = ["Running", "Biking", "Hiking", "Weights"];
                vm.client = ClientService.findClientById(vm.userId); 
            }
            
            init();
            
            function saveInformation(client){
                vm.client = ClientService.updateClient(client);
            }

            function uploadTab() {
                $('.active').removeClass('active');
                $('#upload').addClass('active');
            }

            function informationTab() {
                $('.active').removeClass('active');
                $('#information').addClass('active');
            }
        };
})();