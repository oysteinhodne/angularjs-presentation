var app = angular.module('controllerDemo', []);

app.controller('MainController', function($scope){
    $scope.message = 'Hello Angular from controller!';
});