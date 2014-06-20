'use strict'

app.factory('githubService', function($http){
    var getUser = function(username){
        return $http.get('https://api.github.com/users/' + username)
                    .then(function(response){
                        return response.data;
                    });
    };

    var getRepos = function(username){
        return $http.get('https://api.github.com/repos/' + username)
                    .then(function(response){
                        return response.data;
                    });
    };

    return {
        getUser: getUser,
        getRepo: getRepos
    }
})