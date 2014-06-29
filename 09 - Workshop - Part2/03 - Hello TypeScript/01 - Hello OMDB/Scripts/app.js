/// <reference path="../../../Extrernal Libs/DefinitionFiles/AngularJs/angular.d.ts"/>
/// <reference path="../../../Extrernal Libs/DefinitionFiles/AngularJs/angular-route.d.ts"/>
var omdb;
(function (omdb) {
    omdb.app = angular.module('omdbViewer', ['ngRoute']);
})(omdb || (omdb = {}));
var omdb;
(function (omdb) {
    omdb.app.value('omdbUrl', 'http://www.omdbapi.com/?');
})(omdb || (omdb = {}));
var omdb;
(function (omdb) {
    omdb.app.config(function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main.html',
            controller: 'MainController'
        }).when('/movies/:movieTitle/:year?', {
            templateUrl: 'search-result.html',
            controller: 'SearchResultController'
        }).when('/movie/:movieId', {
            templateUrl: 'movie.html',
            controller: 'MovieController'
        }).otherwise({
            redirectTo: '/main'
        });
    });
})(omdb || (omdb = {}));
var omdb;
(function (omdb) {
    omdb.app.filter('capitalize', function () {
        return function (input, scope) {
            if (input != null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    });
})(omdb || (omdb = {}));
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
var omdb;
(function (_omdb) {
    (function (services) {
        var omdb = (function () {
            function omdb(_$http, _omdbUrl) {
                this.searchMovies = function (title, year) {
                    var url = this.omdbUrl + 's=' + title;
                    if (year) {
                        url = url + '&y=' + year;
                    }

                    return this.$http.get(url).then(function (response) {
                        return response.data;
                    });
                };
                this.getMovieById = function (movieId) {
                    return this.$http.get(this.omdbUrl + 'i=' + movieId).then(function (response) {
                        return response.data;
                    });
                };
                this.$http = _$http;
                this.omdbUrl = _omdbUrl;
            }
            omdb.$inject = ['$http', 'omdbUrl'];
            return omdb;
        })();
        services.omdb = omdb;
    })(_omdb.services || (_omdb.services = {}));
    var services = _omdb.services;
})(omdb || (omdb = {}));
var omdb;
(function (omdb) {
    (function (directives) {
        var myRaringDirective = (function () {
            function myRaringDirective() {
                return {
                    restrict: 'A',
                    template: '<ul class="rating">' + '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '<li style="margin-left:5px">{{ratingValue}} / {{max}}</li>' + '</ul>',
                    scope: {
                        ratingValue: '=',
                        max: '=',
                        onRatingSelected: '&'
                    },
                    link: function (scope, elem, attrs) {
                        var updateStars = function () {
                            scope.stars = [];
                            for (var i = 0; i < scope.max; i++) {
                                scope.stars.push({ filled: i < scope.ratingValue });
                            }
                        };

                        scope.toggle = function (index) {
                            scope.ratingValue = index + 1;
                            scope.onRatingSelected({ rating: index + 1 });
                        };

                        scope.$watch('ratingValue', function (oldVal, newVal) {
                            if (newVal || newVal === 0) {
                                updateStars();
                            }
                        });
                    }
                };
            }
            return myRaringDirective;
        })();
        directives.myRaringDirective = myRaringDirective;
    })(omdb.directives || (omdb.directives = {}));
    var directives = omdb.directives;
})(omdb || (omdb = {}));
/// <reference path="Bootstrap/Init.ts"/>
/// <reference path="Bootstrap/Configs.ts"/>
/// <reference path="Bootstrap/RouteConfig.ts"/>
/// <reference path="Filters/Filters.ts"/>
/// <reference path="Controllers/Controllers.ts"/>
/// <reference path="Services/omdbService.ts"/>
/// <reference path="Directives/directives.ts"/>
/**
* Wire up all parts into our app.
* */
var omdb;
(function (omdb) {
    omdb.app.service(omdb.services);
    omdb.app.controller(omdb.controllers);
    omdb.app.directive(omdb.directives);
})(omdb || (omdb = {}));
//Compile with tsc main.ts --out 'app.js' --sourcemap
