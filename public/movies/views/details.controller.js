(function(){
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);
    
    function MovieDetailsController($routeParams) {
        var vm = this;
        var imdbID = $routeParams.imdbID;

        function init() {
            var url = "http://www.omdbapi.com?i=" + imdbID;

            $http
                .get(url)
                .success(function(response){

                });
        }
    }

})();