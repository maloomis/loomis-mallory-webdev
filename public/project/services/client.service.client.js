(function () {
    angular
        .module("FitnessApp")
        .factory("ClientService", ClientService);
    
    function ClientService($http) {        
        var api = {
            "createClient" : createClient,
            "deleteClient" : deleteClient,
            "findClientByCredentials" : findClientByCredentials,
            "findClientById" : findClientById,
            "updateClient" : updateClient,
            "favoriteRecipe" : favoriteRecipe,
            "unfavoriteRecipe" : unfavoriterecipe,
            "followTrainer": followTrainer,
            "unfollowTrainer": unfollowTrainer
        };

        return api;

        function createClient(client) {
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
    }
})();