'use strict'

/*
    Define a factory on the app module created in app.js
    We inject the $http service in order to make http calls to the github api.
*/
app.factory('githubService', function($http){

    //Define the functions within the factory
    var getUser = function(username){
        return $http.get('https://api.github.com/users/' + username)
                    .then(function(response){
                        return response.data;
                    });
    };

    var getRepos = function(user){
        return $http.get(user.repos_url)
                    .then(function(response){
                        return response.data;
                    });
    };

    var getRepoDetails = function(username, reponame){
        var repo;
        var repoUrl = "https://api.github.com/repos/" + username + '/' + reponame;

        return $http.get(repoUrl)
                    .then(function(response){
                        repo = response.data;
                        return $http.get(repoUrl + '/collaborators');
                    })

                    .then(function(response){
                        repo.collaborators = response.data;
                        return repo;
                    });
    };

    //Return an object providing access to the functions within the service.
    return {
        getUser: getUser,
        getRepos: getRepos,
        getRepoDetails: getRepoDetails
    }
});