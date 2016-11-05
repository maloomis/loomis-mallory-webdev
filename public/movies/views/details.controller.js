(function(){
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);
    
    function MovieDetailsController($routeParams, MovieService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;

        function init() {
            MovieService.search
                .success(function(response){
                    vm.movie = response;
                });
        }
    }

})();