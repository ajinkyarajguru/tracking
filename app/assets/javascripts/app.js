var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'index.html',
            controller: 'UserCtrl'
        }).when('/users/:userId', {
            templateUrl: 'user.html',
            controller: 'UserCtrl'
        }).when('/users', {
            templateUrl: 'users.html',
            controller: 'UsersCtrl'
        }).when('/projects', {
            templateUrl: 'projects.html',
            controller: 'ProjectByUserCtrl'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);




