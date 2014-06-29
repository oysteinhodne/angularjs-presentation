'use strict'

app.factory('omdb', function($http, omdbUrl){

    //Define the functions within the factory
    var searchMovies = function(title, year){
        var url = omdbUrl + 's=' + title;

        if(year)
            url = url + '&y=' + year;

        return $http.get(url)
                    .then(function(response){
                        return response.data;
                    });
    };

    var getMovieById = function(movieId){
        return $http.get(omdbUrl + 'i=' + movieId)
                   .then(function(response){
                       return response.data;
                   });
    };

    //Return an object providing access to the functions within the service.
    return {
        searchMovies: searchMovies,
        getMovieById: getMovieById
    }
});