var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'index.html',
            controller: 'UserCtrl'
        }).when('/users/:userId', {
            templateUrl: 'users.html',
            controller: 'UserCtrl'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);

controllers = angular.module('controllers', []);
controllers.controller("UserCtrl", ['$scope', '$routeParams', '$resource',
function($scope, $routeParams, $resource) {
    User = $resource(/*'http://rest-service.guides.spring.io/greeting'*/'/api/users/:userId', {
        userId: "@id"
    });
    
    User.get({userId:$routeParams.userId}).$promise.then(function(result){
        $scope.user=users;
    });

    
    
}]);


var users = {
    id: 1,
    name: 'Abhay'
};