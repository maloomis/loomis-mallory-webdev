(function () {
    angular
        .module("FitnessApp")
        .factory("TrainerService", TrainerService);
    
    function TrainerService($http) {        
        var api = {
            "createTrainer": createTrainer,
            "deleteTrainer": deleteTrainer,
            "findTrainerByCredentials": findTrainerByCredentials,
            "findTrainerById": findTrainerById,
            "findTrainersByName": findTrainersByName,
            "updateTrainer": updateTrainer,
            "findTrainers": findTrainers,
            "messageTrainer": messageTrainer
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

        function findTrainerById(trainerId) {
            var url = '/api/trainer/' + trainerId;
            return $http.get(url);
        };

        function findTrainers() {
            var url = '/api/trainers';
            return $http.get(url);
        }

        function findTrainersByName(trainer) {
            var url = '/api/searchTrainer?firstname=' + trainer.firstName + '&lastname=' + trainer.lastName;
            return $http.get(url);
        }

        function updateTrainer(trainer) {
            var url = "/api/trainer";
            return $http.put(url, trainer);
        };

        function messageTrainer(message, clientId, trainerId) {
            var url = "/api/trainer/" + trainerId + "/client/" + clientId + "/message";
            return $http.put(url, message);
        }
    }
})();