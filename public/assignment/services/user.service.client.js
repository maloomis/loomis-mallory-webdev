(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var users = [];
        
        var api = {
            "createUser" : createUser,
            "deleteUser" : deleteUser,
            "findUserByCredentials" : findUserByCredentials,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "updateUser" : updateUser
        };

        return api;

        function createUser(user) {
            user._id = Math.random();
            users.push(user);
            return user;
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            users.splice(users.indexOf(user), 1);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user/?username=' + username + '&password=' + password;
            return $http.get(url);
        }
        
        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser.username == username) {
                    return currentUser;
                }
            }
        }
        
        function updateUser(userId, user) {
            var url = "/user/" + user._id;
            $http.put(url, user);
        }
    }
})();