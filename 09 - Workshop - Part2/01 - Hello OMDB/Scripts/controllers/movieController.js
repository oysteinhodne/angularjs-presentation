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
