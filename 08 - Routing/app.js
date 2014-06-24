var app = angular.module('githubViewer', ['ngRoute'])
            .config(function($routeProvider){
                $routeProvider
                    .when('/main', {
                        templateUrl:'main.html',
                        controller: 'MainController'
                    })
                    .when('/user/:username', {
                        templateUrl: 'user.html',
                        controller: 'UserController'
                    })
                    .when('/user/:username/:reponame', {
                        templateUrl: 'repo.html',
                        controller: 'RepoController'
                    })
                    .otherwise({
                        redirectTo: '/main'
                    });
            });

app.controller('MainController', function($scope, $location){
    $scope.searchUser = function(username){
        $location.path('/user/' + username);
    }
});

app.controller('UserController', function($scope, $routeParams, githubService){
    var onUserComplete = function(data){
        $scope.user = data;
        githubService.getRepos($scope.user).then(onRepos);
    };

    var onRepos = function(data){
        $scope.repos = data;
    };

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "-stargazers_count";
    githubService.getUser($scope.username).then(onUserComplete);
});

app.controller('RepoController', function($scope, $routeParams, githubService){
    var onRepo = function(data){
        $scope.repo = data
    };

    var reponame = $routeParams.reponame;
    var username = $routeParams.username;

    githubService.getRepoDetails(username, reponame)
        .then(onRepo);
});