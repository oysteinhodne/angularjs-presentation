app.controller('MainController', function($scope, $location){
    $scope.search = function(movieTitle, year){
        var url = '/movies/' + movieTitle;
        if(year)
            url = url + '/' + year;

        $location.path(url);
    }

});