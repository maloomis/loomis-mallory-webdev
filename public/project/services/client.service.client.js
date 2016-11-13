(function () {
    angular
        .module("FitnessApp")
        .factory("ClientService", ClientService);
    
    function ClientService() {        
        var api = {
            "createClient" : createClient,
            "deleteClient" : deleteClient,
            "findClientByCredentials" : findClientByCredentials,
            "findClientById" : findClientById,
            "updateClient" : updateClient
        };

        return api;

        function createUser(client) {
            var url = '/api/client';
            return $http.post(url, client);
        };

        function deleteClient(clientId) {
            var url = '/api/client/' + clientId;
            return $http.delete(url);
        };

        function findClientByCredentials(username, password) {
            var url = '/api/client/?username=' + username + '&password=' + password;
            return $http.get(url);
        };

        function findClientById(userId) {
            var url = '/api/client/' + userId;
            return $http.get(url);
        };

        function updateClient(client) {
            var url = "/api/client/" + user._id;
            return $http.put(url, user);
        };
    }
})();