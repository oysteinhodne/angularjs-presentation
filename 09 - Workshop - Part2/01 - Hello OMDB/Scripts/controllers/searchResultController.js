app.controller('SearchResultController', function($scope, $routeParams, omdb){
    var movieTitle = $routeParams.movieTitle;
    var year = $routeParams.year

    omdb.searchMovies(movieTitle, year).then(function(movies){
        $scope.movies = movies;
    });

    $scope.orderByProp = 'Title';
});