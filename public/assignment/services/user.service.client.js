(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService() {
        
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
                    ];
        
        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };

        function createUser(user) {
            user._id = Math.random();
            users.push(user);
            return user;
        }
        
        function findUserById(userId) {
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser._id == userId) {
                    return currentUser;
                }
            }
        }
        
        function findUserByUsername(username) {
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser.username == username) {
                    return currentUser;
                }
            }
        }
        
        function findUserByCredentials(username, password) {
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser.username == username && 
                    currentUser.password == password) {
                    return currentUser;
                }
            }

        }
        
        function updateUser(userId, user) {
            for (var x = 0; x < users.length; x++) {
                var currentUser = users[x];
                if (currentUser.userId == userId) {
                    if (user.username) {
                        currentUser.username = user.username;
                    }
                    if (user.firstname) {
                        currentUser.firstname = user.firstname;
                    }
                    if (user.lastname) {
                        currentuser.lastname = user.lastname;
                    }
                    return currentUser;
                }
            }
        }
        
        function deleteUser(userId) {

        }
        
        return api;
    }
})();