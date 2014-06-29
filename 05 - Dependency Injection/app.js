var app = angular.module('myApp', ['otherModule'])
    .value('numberValue', 999);

angular.module('otherModule', [])
    .value('otherModuleValue', 'This is a value from the other module');

app.controller('Controller', ['$scope', 'numberValue', 'otherModuleValue',function(s, numberValue, otherModuleValue){
    s.numberValue = numberValue;
    s.otherModuleValue = otherModuleValue;
}]);

app.controller('Controller2', function($scope, numberValue, otherModuleValue){
    $scope.numberValue = numberValue;
    $scope.otherModuleValue = otherModuleValue;
});

function Ctrl3(a,b,c){
    a.numberValue = b;
    a.otherModuleValue = c;
}

Ctrl3['$inject'] = ['$scope', 'numberValue', 'otherModuleValue'];
app.controller(Ctrl3);
