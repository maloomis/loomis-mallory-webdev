(function () {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);
    
    function MovieService($http) {
        var api = {
            "searchMovieByTitle": searchMovieByTitle,
            "searchMovieByImdbID": searchMovieByImdbID
        }

        return api;

        function searchMovieByTitle() {
            var url = "http.www.omdapi.com/?s=" + title;
            return $http.get(url);

        }

        function searchMovieByImdbId() {
            var url = "http://www.omdbapi.com?i=" + imdbID;
            return $http.get(url);

        }
    }
})