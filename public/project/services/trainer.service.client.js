(function () {
    angular
        .module("FitnessApp")
        .factory("TrainerService", TrainerService);
    
    function TrainerService($http) {        
        var api = {
            "registerTrainer": registerTrainer,
            "trainerLogin": trainerLogin,
            "checkTrainerLogin": checkTrainerLogin,
            "trainerLogout": trainerLogout,
            "deleteTrainer": deleteTrainer,
            "findTrainerById": findTrainerById,
            "findTrainersByName": findTrainersByName,
            "updateTrainer": updateTrainer,
            "findTrainers": findTrainers,
            "messageTrainer": messageTrainer,
            "deleteMessage": deleteMessage
        };

        return api;

        function registerTrainer(trainer) {
            var url = "/api/registerTrainer";
            return $http.post(url, trainer);
        }

        function trainerLogin(trainer) {
            var url = "/api/trainerLogin";
            return $http.post(url, trainer);
        }

        function checkTrainerLogin() {
            return $http.post("/api/checkTrainerLogin");
        }

        function trainerLogout() {
            return $http.post('/api/trainerLogout');
        }

        function deleteTrainer(trainerId) {
            var url = '/api/trainer/' + trainerId;
            return $http.delete(url);
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

        function deleteMessage(messageId, trainerId) {
            var url = "/api/trainer/" + trainerId + "/message/" + messageId;
            return $http.delete(url);
        }
    }
})();