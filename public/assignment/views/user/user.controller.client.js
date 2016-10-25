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
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function(user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                });
        }
    }
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .success(function(user) {
                    $location.url("/user/"+ user._id);
                })
                .error(function(){
                    
                });
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

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error (function() {

                });
        }
        
        init();
        
        vm.deleteUser = deleteUser;
        vm.edit = edit;
        vm.loadwebsites = loadwebsites;

        function deleteUser() {
            UserService.deleteUser(vm.userId);
            $location.url("/login");
        }
        
        function edit(user){
            user = UserService.updateUser(user._id, user);
        }

        function loadwebsites(user) {
            var promise = UserService.findUserById(user._id);
            promise.success(function(user) {
                if (user === '0') {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + user._id + "/website");
                }
            });
        }
    }
})();