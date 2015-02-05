controllers = angular.module('controllers', []);

controllers.controller("UserCtrl", ['$scope', '$routeParams', '$resource',
    function($scope, $routeParams, $resource) {
        User = $resource('/api/users/:userId', {
            userId: "@id"
        });

        User.get({
            userId: $routeParams.userId
        }).$promise.then(function(result) {
            console.log(result);
            $scope.user = result;
        });
    }
]);

app.factory("User",function(){

});

controllers.controller("UsersCtrl", ['$scope', '$resource', '$resource',
	function($scope,$resource,$resource){

		User = $resource('/api/users');	
        User.query().$promise.then(function(result){
            $scope.users=result;
        });
	}
]);

controllers.controller("ProjectByUserCtrl", ['UserCtrl',
    
]);

    

