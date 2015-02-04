controllers = angular.module('controllers', []);
controllers.controller("UserCtrl", ['$scope', '$routeParams', '$resource',
function($scope, $routeParams, $resource) {
    User = $resource('/api/users/:userId', {
        userId: "@id"
    });
    
    User.get({userId:$routeParams.userId}).$promise.then(function(result){
        $scope.user=result.user;
    });
}]);