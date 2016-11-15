(function () {
    angular
        .module("FitnessApp")
        .factory("TrainerService", TrainerService);
    
    function TrainerService($http) {        
        var api = {
            "createTrainer" : createTrainer,
            "deleteTrainer" : deleteTrainer,
            "findTrainerByCredentials" : findTrainerByCredentials,
            "findTrainerById" : findTrainerById,
            "updateTrainer" : updateTrainer
        };

        return api;

        function createTrainer(trainer) {
            var url = '/api/trainer';
            return $http.post(url, trainer);
        };

        function deleteTrainer(trainerId) {
            var url = '/api/trainer/' + trainerId;
            return $http.delete(url);
        };

        function findTrainerByCredentials(username, password) {
            var url = '/api/trainer/?username=' + username + '&password=' + password;
            return $http.get(url);
        };

        function findTrainerById(userId) {
            var url = '/api/trainer/' + userId;
            return $http.get(url);
        };

        function updateTrainer(trainer) {
            var url = "/api/trainer/" + user._id;
            return $http.put(url, user);
        };
    }
})();