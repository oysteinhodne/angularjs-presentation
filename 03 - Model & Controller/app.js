var app = angular.module('githubViewer', []);

app.controller('MainController', function($scope, $http){
    $scope.username = 'angular';

    $scope.searchUser = function(username){
        $http.get('https://api.github.com/users/' + username)
            .then(function(response){
                $scope.user = response.data;
            })
    }
});