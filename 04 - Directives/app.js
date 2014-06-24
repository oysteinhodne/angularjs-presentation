var app = angular.module('githubViewer', []);

app.controller('MainController', function($scope, $http){
    $scope.searchUser = function(username){
        $http.get('https://api.github.com/users/' + username)
            .then(function(response){
                $scope.user = response.data;
                $http.get($scope.user.repos_url)
                    .then(function(response){
                        $scope.repos = response.data;
                    })
            })
    }

    $scope.logRating = function(rating){
        console.log(rating);
    }
});