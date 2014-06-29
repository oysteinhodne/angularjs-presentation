/**
 * Created by Per on 2014-06-26.
 */

var app = angular.module('omdbViewer', ['ngRoute'])
            .config(function($routeProvider){
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

app.value('omdbUrl', 'http://www.omdbapi.com/?');

//Custom Filter
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});