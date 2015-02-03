app=angular.module('tracking',['templates','ngRoute','controllers','ngResource']);

app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
	
	$routeProvider.when('/', {
		templateUrl: 'index.html',
		controller: 'UserCtrl'
	}).when('/users', {
    templateUrl: 'users.html',
    controller:'UserCtrl'
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);

controllers = angular.module('controllers',[]);
controllers.controller("UserCtrl", [ '$scope','$routeParams','$resource', function($scope,$routeParams,$resource){
    $scope.users=users;
}]);

var users = [
  {
    id: 1,
    name: 'Abhay'
  },
  {
    id: 2,
    name: 'Ajinkya'
  },
  {
    id: 3,
    name: 'Balaji'
  },
  {
    id: 4,
    name: 'Bala'
  }
];