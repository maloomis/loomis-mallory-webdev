(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var promise = UserService.login(username, password)
            .success(function(user) {
                console.log(user);
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
            var promise = UserService
                                .register(user)
                                .then(
                                    function(response) {
                                        var user = response.data;
                                        $location.url("/user/"+user._id);
                                    }
                                )
        };
    }
    
    function ProfileController($location, $routeParams, UserService) {
        var vm = this; 
        vm.userId = $routeParams["uid"];

        function init() {
            UserService.findUserById(vm.userId)
                .success(function(user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error (function() {
                    vm.error = "Could not retrieve user";
                });
        }
        
        init();
        
        vm.deleteUser = deleteUser;
        vm.edit = edit;
        vm.loadwebsites = loadwebsites;
        vm.logout = logout;

        function deleteUser() {
            var promise = UserService.deleteUser(vm.userId);
            promise.success(function(response) {
                $location.url("/login");
            });
        }
        
        function edit(user){
            var promise = UserService.updateUser(user._id, user);
            promise.success(function(status) {
                    if (status === '0') {
                        vm.error = "Could not update user.";
                    } else {
                        $location.url("/user/" + vm.user._id);
                    }
                });
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

        function logout() {
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }
    }
})();