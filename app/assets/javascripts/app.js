var app = angular.module('tracking', ['templates', 'ngRoute',  'ngResource', 'controllers','authentication','ui.bootstrap','angularChart']);

 

app.config(['$routeProvider', '$locationProvider','USER_ROLES',
    function($routeProvider, $locationProvider,USER_ROLES) {

        $routeProvider.when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController',
            
        }).when('/users/new', {
            templateUrl: 'users.new.html',
            controller: 'UserFormController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/users/:userId', {
            templateUrl: 'users.show.html',
            controller: 'UserController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/users', {
            templateUrl: 'users.index.html',
            controller: 'UsersController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/projects', {
            templateUrl: 'projects.index.html',
            controller: 'ProjectsByUserController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/projects/new', {
            templateUrl: 'projects.new.html',
            controller: 'ProjectsFormController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/projects/:projectId', {
            templateUrl: 'projects.index.html',
            controller: 'ProjectsByUserController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/suppliers/new', {
            templateUrl: 'suppliers.new.html',
            controller: 'SupplierFormController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/companies/new', {
            templateUrl: 'companies.new.html',
            controller: 'CompanyFormController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/companies',{
            templateUrl: 'companies.index.html',
            controller: 'CompanyIndexController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        })/*.when('/projects/:projectId/tasks/create',{
            templateUrl: 'project.tasks.create.html',
            controller: 'CreateProjectTasksController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        })*/;

        //.otherwise({ redirectTo: '/users' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);

app.controller('ApplicationController',['$scope','USER_ROLES','AuthService',function($scope, USER_ROLES, AuthService){

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logout=function(){
      $scope.setCurrentUser=null;
  };

}]);

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

app.run(function ($rootScope, AUTH_EVENTS, AuthService,$location) {
  $rootScope.$on('$routeChangeStart', function (event, next) {
     if(next.templateUrl!="login.html"){
        var authorizedRoles = next.data.authorizedRoles;
        console.log(authorizedRoles)
        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {
            console.log(true)
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            // user is not logged in
            $location.path("/login")
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
     }
  });
});