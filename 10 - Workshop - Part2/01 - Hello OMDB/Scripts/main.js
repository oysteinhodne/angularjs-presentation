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

app.controller('MainController', function($scope, $location){
    $scope.search = function(movieTitle, year){
        var url = '/movies/' + movieTitle;
        if(year)
            url = url + '/' + year;

        $location.path(url);
    }

});

app.controller('SearchResultController', function($scope, $routeParams, omdb){
    var movieTitle = $routeParams.movieTitle;
    var year = $routeParams.year

    omdb.searchMovies(movieTitle, year).then(function(movies){
        $scope.movies = movies;
    });

    $scope.orderByProp = 'Title';
});

app.controller('MovieController', function($scope, $routeParams, omdb, $window){
    var movieId = $routeParams.movieId;

    var onMovie = function(data){
        $scope.movie = data;
    }

    omdb.getMovieById(movieId).then(onMovie);

    $scope.logRating = function(rating){
        console.log('New movie rating: ' + rating);
    }

    $scope.back = function(){
        $window.history.back()
    }
});

//Custom Filter
app.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            input = input.toLowerCase();
        return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});