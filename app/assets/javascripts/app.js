var app = angular.module('tracking', ['templates', 'ngRoute', 'controllers', 'ngResource','ui.bootstrap','angularChart']);

 

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'login.html',
            controller: 'LoginController'
        }).when('/users/new', {
            templateUrl: 'user.new.html',
            controller: 'UserFormController'
        }).when('/users/:userId', {
            templateUrl: 'user.show.html',
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
            controller: 'ProjectsFormController'
        }).when('/projects/:projectId', {
            templateUrl: 'project.index.html',
            controller: 'ProjectsByUserController'
        }).when('/suppliers/new', {
            templateUrl: 'supplier.new.html',
            controller: 'SupplierFormController'
        }).when('/companies/new', {
            templateUrl: 'company.new.html',
            controller: 'CompanyFormController'
        }).when('/projects/tasks/create',{
            templateUrl: 'project.tasks.create.html'
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
});

app.filter("rupee",function(){
    return function(input,currencySymbol){

        separated=input.toString().split("").reverse();
        i=4;
        j=2;
        flag=false;
        separated.splice(3,0,",");
        input=input/1000;

        while(input>100){
            if(flag==true){
                j++;
                flag=false;
            }else{
                flag=true;
            }
            
            i+=j;

            separated.splice(i,0,",");
            input/=100;

        }
        separated.push(" ");
        separated.push(currencySymbol);

        return separated.reverse().join("")
    }
});