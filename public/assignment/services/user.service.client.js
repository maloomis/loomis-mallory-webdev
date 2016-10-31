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
            var url = '/api/user';
            return $http.post(url, user);
        }

        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url);
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
            var url = '/api/user/?username=' + username;
            return $http.get(url);
        }
        
        function updateUser(userId, user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }
    }
})();