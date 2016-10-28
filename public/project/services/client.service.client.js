(function () {
    angular
        .module("FitnessApp")
        .factory("ClientService", ClientService);
    
    function ClientService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", weight: "123", height: "5' 5''", 
            workouts: ["boxing", "running", "strengh training"], city: "Windham", state: "New Hampshire", goals: ["lose weight"]},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        
        var api = {
            "findClientByCredentials" : findClientByCredentials,
            "findClientById" : findClientById
        };

        return api;

        function findClientByCredentials(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username &&
                    users[i].password == password) {
                        return users[i];
                }
            }
        };

        function findClientById(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                        return users[i];
                }
            }
        };
    }
})();