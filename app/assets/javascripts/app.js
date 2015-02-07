var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'index.html',
            controller: 'UserController'
        }).when('/users/new', {
            templateUrl: 'newUser.html',
            controller: 'UserFormController'
        }).when('/users/:userId', {
            templateUrl: 'user.html',
            controller: 'UserController'
        }).when('/users', {
            templateUrl: 'users.html',
            controller: 'UsersController'
        }).when('/projects', {
            templateUrl: 'projects.html',
            controller: 'ProjectByUserCtrl'
        }).when('/projects/:projectId', {
            templateUrl: 'projects.html',
            controller: 'ProjectsByUserController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);
