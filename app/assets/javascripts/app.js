var app = angular.module('tracking', ['templates', 'ngRoute', 'ngResource', 'ngCookies', 'controllers','authentication','ui.bootstrap','angularChart']);

app.constant('TASK_CATEGORIES',[
    
    {name:"Payment",code:"Paymt",class:"",verb:"sent"},
    {name:"Order",code:"Order",class:"",verb:"received"},
    {name:"Sample",code:"SAMPL",class:"",verb:"sent"},
    {name:"Courtsey",code:"Court",class:"",verb:"called"},
    {name:"Trial",code:"trial",class:"",verb:"conducted"},
    {name:"Call",code:"Call",class:"",verb:"called"},
    {name:"Dispatch",code:"DSPCH",class:"",verb:"dispatched"},
    {name:"Email",code:"EMAIL",class:"",verb:"sent"}

]); 

/*app.constant('PROJECT_STATUS',[
    {status:"Initial",code:1},
    {status:"Trial Approved",code:2},
    {status:"Trial Successful",code:3},
    {status:"First Order",code:4},
    {status:"Project Completed",code:5}
]);*/

app.config(['$routeProvider', '$locationProvider','USER_ROLES',
    function($routeProvider, $locationProvider,USER_ROLES) {

        $routeProvider.when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController',            
        }).when('/users/new', {
            templateUrl: 'users.new.html',
            controller: 'UserNewController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/users/:userId', {
            templateUrl: 'users.show.html',
            controller: 'UserShowController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            },
        }).when('/users', {
            templateUrl: 'users.index.html',
            controller: 'UserIndexController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/projects', {
            templateUrl: 'projects.index.html',
            controller: 'ProjectIndexController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        }).when('/projects/new', {
            templateUrl: 'projects.new.html',
            controller: 'ProjectNewController',
            data:{
                authorizedRoles:[USER_ROLES.admin]
            }
        }).when('/projects/:projectId', {
            templateUrl: 'projects.show.html',
            controller: 'ProjectShowController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        }).when('/suppliers/new', {
            templateUrl: 'suppliers.new.html',
            controller: 'SupplierNewController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        }).when('/companies/new', {
            templateUrl: 'companies.new.html',
            controller: 'CompanyNewController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        }).when('/companies',{
            templateUrl: 'companies.index.html',
            controller: 'CompanyIndexController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        }).when('/tasks/new',{
            templateUrl:'tasks.new.html',
            controller:'TaskNewController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]   
            }
        }).when('/tasks/:taskId',{
            templateUrl:'tasks.show.html',
            controller:'TaskShowController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]   
            }
        })

        .when('/projects/:projectId/tasks/create',{
            templateUrl: 'project.tasks.create.html',
            controller: 'CreateProjectTasksController',
            data:{
                authorizedRoles:[USER_ROLES.admin,USER_ROLES.sales]
            }
        });

        //.otherwise({ redirectTo: '/users' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
]);

app.controller('ApplicationController',['$scope','$timeout','USER_ROLES','AuthService',function($scope,$timeout, USER_ROLES, AuthService){

  $scope.alerts = [];
  $scope.currentUser = null;
  $scope.tasks = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  $scope.logout=function(){
      $scope.setCurrentUser=null;
  };

  $scope.addAlert=function(messageText,messageType){
    return $scope.alerts.push({msg: messageText,type:messageType});
  }

  $scope.addTimedAlert = function(messageText,messageType,timeout) {

    closeAfterDelay=function(index){
        
        $scope.closeAlert
    }

    index=$scope.addAlert(messageText,messageType);

    $timeout(function(){
        $scope.closeAlert(index-1);
    },timeout)

  };

  $scope.closeAlert = function(index) {
    
    $scope.alerts.splice(index, 1);
  };

  $scope.isAdmin=function(){
    
    return $scope.currentUser.role==USER_ROLES.admin
  }

}]);



app.filter("removeNA",function(){
    return function(input, nullValue, replacement){
        return (input===nullValue) ? replacement : input
    }
});

app.filter("rupee",function(){
    return function(input,currencySymbol){

        if(input){
        separated=input.toString().split("").reverse();
        if(input>1000){
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
        }
        separated.push(" ");
        separated.push(currencySymbol);


        return separated.reverse().join("")
        }else
        return input;
    }
});

app.run(function ($rootScope, $location, $cookies, Session,USER_ROLES,AUTH_EVENTS, AuthService) {

  setTimeout(function(){
    $(".application-container").height($(window).innerHeight());
  },100)
  
  $rootScope.$on('$routeChangeStart', function (event, next) {
     if(next.templateUrl!="login.html"){
        var authorizedRoles = next.data.authorizedRoles;
       
        /*var userAuthorized = true;
        var isRestricted = next.data.restricted || false

        
        if(Session.userRole==USER_ROLES.sales){
            userAuthorized = isRestricted ? (next.pathParams.userId==Session.userId) : true;
        }*/



        if (!AuthService.isAuthorized(authorizedRoles)) {
          event.preventDefault();
          if (AuthService.isAuthenticated()) {                
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          } else {
            
            $location.path("/login")
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          }
        }
     }
  });
});
