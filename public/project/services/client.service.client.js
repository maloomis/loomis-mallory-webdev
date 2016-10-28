(function () {
    angular
        .module("FitnessApp")
        .factory("ClientService", ClientService);
    
    function ClientService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice", email:"loomis.m@husky.neu.edu",  
            lastName: "Wonder", weight: 123, heightFeet: 5, heightInches: 5, 
            workouts: [{ name: 'Running',    selected: true },
                        { name: 'Biking',   selected: false },
                        { name: 'Hiking',     selected: true },
                        { name: 'Weights', selected: false }], city: "Windham", state: "New Hampshire", goals: ["lose weight"]},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        
        var api = {
            "findClientByCredentials" : findClientByCredentials,
            "findClientById" : findClientById,
            "updateClient" : updateClient
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

        function updateClient(client) {
            var clientUpdate = findClientById(client._id);
            if (clientUpdate) {
                clientUpdate.username = client.username;

            }
        }
    }
})();