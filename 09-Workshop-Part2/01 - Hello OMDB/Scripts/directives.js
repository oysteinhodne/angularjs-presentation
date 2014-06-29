app.directive('myRatingDirective', function(){
    return {
        restrict: 'A',
        template:   '<ul class="rating">' +
                      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                        '\u2605' +
                      '</li>' +
                      '<li style="margin-left:5px">{{ratingValue}} / {{max}}</li>' +
                    '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&' //& Triggers evaluation of expression eg. callback functions
        },
        link: function (scope, elem, attrs) {

            var updateStars = function() {
              scope.stars = [];
              for (var  i = 0; i < scope.max; i++) {
                scope.stars.push({filled: i < scope.ratingValue});
              }
            };

            scope.toggle = function(index) {
              scope.ratingValue = index + 1;
              scope.onRatingSelected({rating: index + 1});
            };

            scope.$watch('ratingValue', function(oldVal, newVal) {
              if (newVal || newVal === 0) {
                updateStars();
              }
            });
        }
    }
})
