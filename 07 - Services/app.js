var app = angular.module('serviceDemoApp', []);

app.controller('MainController', function($scope, githubService){

    $scope.search = function(username){
        githubService.getUser(username)
            .then(function(response){
                $scope.user = response;
            });
    }
});