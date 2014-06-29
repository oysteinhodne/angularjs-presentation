module omdb.controllers {
    export class MainController {
        static $inject = ['$scope', '$location'];
        constructor(_$scope, _$location){
            _$scope.search = function(movieTitle, year){
                var url = '/movies/' + movieTitle;
                if(year)
                    url = url + '/' + year;
                _$location.path(url);
            }
        }
    }

    export class SearchResultController{

        static $inject = ['$scope', '$routeParams', 'omdb'];
        constructor(_$scope, _$routeParams, _omdb){
            var movieTitle = _$routeParams.movieTitle;
            var year = _$routeParams.year;

            _omdb.searchMovies(movieTitle, year).then(function(movies){
                _$scope.movies = movies;
            });

            _$scope.orderByProp = 'Title';
        }
    }

    export class MovieController{

        static $inject = ['$scope', '$routeParams', 'omdb', '$window'];
        constructor(_$scope, _$routeParams, _omdb, _$window){
            var movieId = _$routeParams.movieId;

            var onMovie = function(data){
                _$scope.movie = data;
            };

            _omdb.getMovieById(movieId).then(onMovie);

            _$scope.logRating = function(rating){
                console.log('New movie rating: ' + rating);
            };

            _$scope.back = function(){
                _$window.history.back()
            }
        }
    }
}