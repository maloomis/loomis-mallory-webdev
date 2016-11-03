(function(){
    angular
        .module("MovieApp", [])
        .controller("MovieSearchController", MovieSearchController);

        function MovieSearchController($http) {
            var vm = this;
            vm.searchMovieByTitle = searchMovieByTitle;

            function searchMovieByTitle(title) {
                var url = "www.omdapi.com/?s=" + title;
                return $http
                            .get(url)
                            .success();
            }

        }

})();