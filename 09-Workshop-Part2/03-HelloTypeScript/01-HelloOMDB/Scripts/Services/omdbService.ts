module omdb.services {
    export class omdb {
        private $http:ng.IHttpService;
        private omdbUrl:string;

        public searchMovies = function(title, year){
            var url = this.omdbUrl + 's=' + title;
            if(year){
                url = url + '&y=' + year;
            }

        return this.$http.get(url)
            .then(function(response){
                return response.data;
            });
        };
        public getMovieById = function(movieId){
        return this.$http.get(this.omdbUrl + 'i=' + movieId)
            .then(function(response){
                return response.data;
            });
        };

        static $inject = ['$http', 'omdbUrl'];
        constructor(_$http:ng.IHttpService, _omdbUrl:string){
            this.$http = _$http;
            this.omdbUrl = _omdbUrl;
        }
    }
}

