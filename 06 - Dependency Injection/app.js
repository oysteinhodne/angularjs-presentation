var app = angular.module('dependencyInjection', ['otherModule']);

app.value('numberValue', 999);

app.controller('Controller', function($scope, numberValue, otherModuleValue){
    $scope.numberValue = numberValue;
    $scope.otherModuleValue = otherModuleValue;
});

var otherModule = angular.module('otherModule', []);

otherModule.value('otherModuleValue', 'This is a value from the other module');