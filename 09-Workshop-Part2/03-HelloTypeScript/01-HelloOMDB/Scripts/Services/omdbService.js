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
//# sourceMappingURL=omdbService.js.map
