module omdb {

    app.config(function($routeProvider:ng.route.IRouteProvider){
        $routeProvider
            .when('/main', {
                templateUrl: 'main.html',
                controller: 'MainController'
            })
            .when('/movies/:movieTitle/:year?', {
                templateUrl: 'search-result.html',
                controller: 'SearchResultController'
            })
            .when('/movie/:movieId', {
                templateUrl: 'movie.html',
                controller: 'MovieController'
            })
            .otherwise({
                redirectTo: '/main'
            });
    });
}