(function () {
    angular
        .module("FitnessApp")
        .factory("WorkoutService", WorkoutService);
    
    function WorkoutService($http) {        
        var api = {
            "createWorkout" : createWorkout,
        };

        return api;

        function createWorkout(workout) {
            var url = '/api/workout';
            return $http.post(url, workout);
        };
    }
})();