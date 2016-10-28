(function() {
    angular
        .module("FitnessApp")
        .controller("ProfileClientController", ProfileClientController);

        function ProfileClientController($location, ClientService, $routeParams) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            function init() {
                vm.client = ClientService.findClientById(vm.userId); 
            }
            
            init();
            
            vm.deleteUser = deleteUser;
            vm.edit = edit;

            function deleteUser() {
                UserService.deleteUser(vm.userId);
                $location.url("/login");
            }
            
            function edit(user){
                user = UserService.updateUser(user._id, user);
            }
        };
})();