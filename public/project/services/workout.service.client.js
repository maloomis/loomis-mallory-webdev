(function () {
    angular
        .module("FitnessApp")
        .factory("WorkoutService", WorkoutService);
    
    function WorkoutService($http) {        
        var api = {
            "createWorkout" : createWorkout,
            "findWorkoutsForTrainer" : findWorkoutsForTrainer
        };

        return api;

        function createWorkout(trainerId, workout) {
            var url = '/api/workout/' + trainerId;
            return $http.post(url, workout);
        };

        function findWorkoutsForTrainer(trainerId) {
            var url = '/api/workout/' + trainerId;
            return $http.get(url);
        }
    }
})();