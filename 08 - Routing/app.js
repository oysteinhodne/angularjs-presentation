var app = angular.module('bootstrapping', ['ngRoute'])
            .config(function($routeProvider){
                $routeProvider
                    .when('/main',{
                        templateUrl: 'main.html'
                    })
                    .otherwise({
                        redirectTo: '/main'
                    });
            });