authentication=angular.module('authentication',[]);

authentication.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

authentication.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

authentication.controller('LoginController',['$scope','$rootScope','AUTH_EVENTS','AuthService',function($scope,$rootScope,AUTH_EVENTS,AuthService){
   $scope.login=function(credentials){
      AuthService.login(credentials).then(function (result) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        console.log(result)
        $scope.setCurrentUser(result);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
   };

   $scope.logout=function(){
    AuthService.logout();
    $scope.setCurrentUser=null;
   };
}]);

authentication.factory('AuthService', function ($http, Session) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .post('/api/login', {session:credentials})
      .then(function (res) {

        user={};
        if(res.data.status){

          user=res.data.user;
          current_session=res.data.session;
          Session.create(current_session.session_id,current_session.user_id,current_session.user_role);        
        }
        return user;
      });
  };

  authService.logout=function(){
    return $http
      .delete('/api/logout')
      .then(function (res) {        
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
});

authentication.service('Session', function () {
  this.create = function (sessionId,userId, userRole) {
    this.id=sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id=null;
    this.userId = null;
    this.userRole = null;
  };

  return this;
})