(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            user = UserService.createUser(user);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to register";
            }
        }
    }
    
    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.edit = edit;
        vm.loadwebsites = loadwebsites;
        
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function edit(user){
            user = UserService.updateUser(user._id, user);
        }

        function loadwebsites(user) {
            user = UserService.findUserById(user._id);
            if (user) {
                $location.url("/user/" + user._id + "/website")
            } else {
                vm.alert = "Can't retrieve websites";
            }

        }
    }
})();