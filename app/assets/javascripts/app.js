var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'index.html',
            controller: 'UserCtrl'
        }).when('/users/:userId', {
            templateUrl: 'user.html',
            controller: 'UserCtrl'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);




