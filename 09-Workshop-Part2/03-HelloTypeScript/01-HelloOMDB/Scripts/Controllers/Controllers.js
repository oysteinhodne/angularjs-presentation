var omdb;
(function (omdb) {
    (function (controllers) {
        var MainController = (function () {
            function MainController(_$scope, _$location) {
                _$scope.search = function (movieTitle, year) {
                    var url = '/movies/' + movieTitle;
                    if (year)
                        url = url + '/' + year;
                    _$location.path(url);
                };
            }
            MainController.$inject = ['$scope', '$location'];
            return MainController;
        })();
        controllers.MainController = MainController;

        var SearchResultController = (function () {
            function SearchResultController(_$scope, _$routeParams, _omdb) {
                var movieTitle = _$routeParams.movieTitle;
                var year = _$routeParams.year;

                _omdb.searchMovies(movieTitle, year).then(function (movies) {
                    _$scope.movies = movies;
                });

                _$scope.orderByProp = 'Title';
            }
            SearchResultController.$inject = ['$scope', '$routeParams', 'omdb'];
            return SearchResultController;
        })();
        controllers.SearchResultController = SearchResultController;

        var MovieController = (function () {
            function MovieController(_$scope, _$routeParams, _omdb, _$window) {
                var movieId = _$routeParams.movieId;

                var onMovie = function (data) {
                    _$scope.movie = data;
                };

                _omdb.getMovieById(movieId).then(onMovie);

                _$scope.logRating = function (rating) {
                    console.log('New movie rating: ' + rating);
                };

                _$scope.back = function () {
                    _$window.history.back();
                };
            }
            MovieController.$inject = ['$scope', '$routeParams', 'omdb', '$window'];
            return MovieController;
        })();
        controllers.MovieController = MovieController;
    })(omdb.controllers || (omdb.controllers = {}));
    var controllers = omdb.controllers;
})(omdb || (omdb = {}));
//# sourceMappingURL=Controllers.js.map
