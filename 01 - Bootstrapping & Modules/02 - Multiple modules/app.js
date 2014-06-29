angular.module('bootstrappingDemo', ['extra'])
.controller('startCtrl', ['$scope','userName',function($scope, userName){
	$scope.user = userName;
}]);


//Regestering dependent module, dont have to be in order.
angular.module('extra',[])
.constant('userName', "John Doe");
