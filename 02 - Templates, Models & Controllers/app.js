var app = angular.module('githubViewer', []);

app.controller('MainController', function($scope, $http){
    //Define a variable on the scope-model
    $scope.username = 'angular';

    //Define a function on the scope-model, that can be called from the template
    $scope.searchUser = function(username){
        $http.get('https://api.github.com/users/' + username)
            .then(function(response){
                $scope.user = response.data;
            })
    }
});