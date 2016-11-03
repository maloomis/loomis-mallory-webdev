(function() {
    angular
        .module("MovieApp", ['ngRoute'])
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "search.view.html"
            })
            .when("/details/:imdbID", {
                templateUrl: ""
            });
    }
})();