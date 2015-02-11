var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'index.html',
            controller: 'UserController'
        }).when('/users/new', {
            templateUrl: 'user.new.html',
            controller: 'UserFormController'
        }).when('/users/:userId', {
            templateUrl: 'user.html',
            controller: 'UserController'
        }).when('/users/:userId/edit', {
            templateUrl: 'user.edit.html',
            controller: 'UserFormController'
        }).when('/users', {
            templateUrl: 'user.index.html',
            controller: 'UsersController'
        }).when('/projects', {
            templateUrl: 'project.index.html',
            controller: 'ProjectsByUserController'
        }).when('/projects/new', {
            templateUrl: 'project.new.html',
            controller: 'ProjectsByUserController'
        }).when('/projects/:projectId', {
            templateUrl: 'project.index.html',
            controller: 'ProjectsByUserController'
        }).when('/suppliers/new', {
            templateUrl: 'supplier.new.html',
            controller: 'SupplierFormController'
        }).when('/companies/new', {
            templateUrl: 'company.new.html',
            controller: 'CompanyFormController'
        })

        ;//.otherwise({ redirectTo: '/users' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);


app.filter("removeNA",function(){
    return function(input, nullValue, replacement){
        return (input===nullValue) ? replacement : input
    }

})