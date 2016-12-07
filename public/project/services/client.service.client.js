(function () {
    angular
        .module("FitnessApp")
        .factory("ClientService", ClientService);
    
    function ClientService($http) {        
        var api = {
            "registerClient": registerClient,
            "clientLogin": clientLogin,
            "checkClientLogin": checkClientLogin,
            "clientLogout": clientLogout,
            "createClient" : createClient,
            "deleteClient" : deleteClient,
            "findClientByCredentials" : findClientByCredentials,
            "findClientById" : findClientById,
            "updateClient" : updateClient,
            "favoriteRecipe" : favoriteRecipe,
            "unfavoriteRecipe" : unfavoriterecipe,
            "followTrainer": followTrainer,
            "unfollowTrainer": unfollowTrainer,
            "messageClient": messageClient,
            "deleteMessage": deleteMessage,
            "findClients": findClients,
            "findClientsByName": findClientsByName
        };

        return api;

        function registerClient(client) {
            var url = "/api/registerClient";
            return $http.post(url, client);
        }

        function clientLogin(client) {
            var url = "/api/clientLogin";
            return $http.post(url, client);
        }

        function checkClientLogin() {
            return $http.post("/api/checkClientLogin");
        }

        function clientLogout() {
            return $http.post('/api/clientLogout');
        }

        function createClient(client) {
            var url = '/api/client';
            return $http.post(url, client);
        };

        function deleteClient(clientId) {
            var url = '/api/client/' + clientId;
            return $http.delete(url);
        };

        function login(client) {
            return $http.post("/api/clientLogin", client);
        }

        function findClientByCredentials(username, password) {
            var url = '/api/client/?username=' + username + '&password=' + password;
            return $http.get(url);
        };

        function findClientById(clientId) {
            var url = '/api/client/' + clientId;
            return $http.get(url);
        };

        function updateClient(clientId, client) {
            var url = "/api/client/" + client._id;
            return $http.put(url, client);
        };

        function favoriteRecipe(recipeId, clientId) {
            var url = "/api/client/" + clientId + "/recipe/" + recipeId;
            return $http.put(url);
        };

        function unfavoriterecipe(clientId, recipeId) {
            var url = "/api/client/" + clientId + "/recipe/" + recipeId;
            return $http.delete(url);
        }

        function followTrainer(clientId, trainerId) {
            var url = "/api/client/" + clientId + "/trainer/" + trainerId;
            return $http.put(url);
        }

        function unfollowTrainer(clientId, trainerId) {
            var url = "/api/client/" + clientId + "/trainer/" + trainerId;
            return $http.delete(url);
        }

        function messageClient(message, clientId, trainerId) {
            var url = "/api/client/" + clientId + "/trainer/" + trainerId + "/message";
            return $http.put(url, message);
        }

        function deleteMessage(messageId, clientId) {
            var url = "/api/client/" + clientId + "/message/" + messageId;
            return $http.delete(url);
        }

        function findClients() {
            var url = '/api/clients';
            return $http.get(url);
        }

        function findClientsByName(client) {
            var url = '/api/searchClient?firstname=' + client.firstName + '&lastname=' + client.lastName;
            return $http.get(url);
        }
    }
})();