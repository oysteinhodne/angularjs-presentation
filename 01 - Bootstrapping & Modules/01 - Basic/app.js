//Creating a module
var app = angular.module('bootstrappingDemo', [/*Dependecies goes in here*/])
    .value('appName', 'mySuperAwesomeAngularApp')
    //Configure the application
    .config(function(/*Inject dependencies*/){
        //Put some configuration code right here
    })
    //Define constant variables that can be injected into other modules.
    .constant('myVar', 'someValue or function');