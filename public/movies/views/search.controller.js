(function(){
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

        function MovieSearchController(MovieService) {
            var vm = this;
            vm.searchMovieByTitle = searchMovieByTitle;

            function searchMovieByTitle(title) {
                MovieService
                    .searchMovieByTitle(title)
                    .success(function(movies){
                        vm.movies = movies;
                    });
            }

        }

})();