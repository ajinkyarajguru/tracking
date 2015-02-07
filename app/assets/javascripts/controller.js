controllers = angular.module('controllers', []);

controllers.controller("UserController", ['$scope', '$routeParams', '$resource','$filter',
    function($scope, $routeParams, $resource,$filter) {

        var orderBy = $filter('orderBy');

        User = $resource('/api/users/:userId', {
            userId: "@id"
        });

        User.get({
            userId: $routeParams.userId
        }).$promise.then(function(result) {            
            $scope.user = result;
            $scope.projects=$scope.user.projects;
            $scope.order($scope.column,$scope.ascending);
        });

        $scope.order = function(predicate) {
            
            if(predicate!=$scope.column){
                $scope.ascending=true;
            }else{
                $scope.ascending=!$scope.ascending;
            }
        
            $scope.projects=orderBy($scope.projects,predicate,$scope.ascending);
            $scope.column=predicate;
        };

        $scope.ascending=true;
        $scope.column="projected_revenue";

        /*$scope.sort={
            ascending: true,
            column: "projected_revenue"
        
        }*/
    }

]);



controllers.controller("UsersController", ['$scope', '$resource', '$resource',
	function($scope,$resource,$resource){
		User = $resource('/api/users');	
        User.query().$promise.then(function(result){
            $scope.users=result;
        });
	}
]);


controllers.controller('UserFormController', ['$scope','$resource', function ($scope, $resource) {

    

    $scope.update=function(){
        User=$resource('/api/users/:userId');
        newUser= new User();
        newUser.save($scope.user,function(result){
            console.log(result)
        });
    };

    $scope.master={};

}]);
    

