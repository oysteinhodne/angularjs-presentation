var app = angular.module('githubViewer', []);

//Inject the custom service as a dependency in the controller
app.controller('MainController', function($scope, githubService){
    $scope.searchUser = function(username){
        //Call the method on the service
        githubService.getUser(username)
            .then(function(response){
                $scope.user = response;

                //call another method on the service when the previous call returns a response
                githubService.getRepos($scope.user.repos_url)
                    .then(function(response){
                        $scope.repos = response;
                    });
            });
    }
});