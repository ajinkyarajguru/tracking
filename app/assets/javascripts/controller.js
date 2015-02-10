controllers = angular.module('controllers', []).factory('User', function($resource) {
    return $resource('/api/users/:userId');
}).factory('Project', function ($resource) {
    return $resource('/api/projects/:projectId');
}).factory('Company', function ($resource) {
    return $resource('/api/companies/:companyId');
}).factory('Supplier', function ($resource) {
    return $resource('/api/suppliers/:supplierId');
});

controllers.controller("UserController", ['$scope', '$routeParams', 'User', '$filter',
    function($scope, $routeParams, User, $filter) {

        var orderBy = $filter('orderBy');

        $scope.id = $routeParams.userId

        User.get({
            userId: $scope.id
        }).$promise.then(function(result) {
            $scope.user = result;
            $scope.projects = $scope.user.projects;
            $scope.order($scope.column, $scope.ascending);
        });

        $scope.order = function(predicate) {

            if (predicate != $scope.column) {
                $scope.ascending = true;
            } else {
                $scope.ascending = !$scope.ascending;
            }

            $scope.projects = orderBy($scope.projects, predicate, $scope.ascending);
            $scope.column = predicate;
        };

        $scope.ascending = true;
        $scope.column = "projected_revenue";

    }

]);



controllers.controller("UsersController", ['$scope', 'User',
    function($scope, User) {

        User.query().$promise.then(function(result) {
            $scope.users = result;
        });
    }
]);


controllers.controller('UserFormController', ['$scope', 'User',
    function($scope, User) {

        $scope.master = {};

        $scope.user = {};

        $scope.update = function(user) {
            newUser = new User();
            newUser.user = user;
            newUser.$save(function(result) {});
        };

        $scope.reset = function() {
            $scope.user = $scope.master;
        };

    }
]);

controllers.controller('ProjectsByUserController', ['$scope','User','Company','Supplier','Project',
    function($scope,User,Company,Supplier,Project) {

        

        $scope.addProject = function(project) {
     

     console.log(project.company)     
          newProject = new Project();
          newProject.user_id = project.user.id;
          newProject.supplier_id = project.supplier.id;
         newProject.company_id = project.company.id;
         newProject.projected_revenue=project.projected_revenue;
          newProject.start_on=project.start_on;
          newProject.planned_end=project.planned_end;
          
          newProject.$save(function(result) {});  
        };

        User.query().$promise.then(function(users){
            $scope.users=users;
            setTimeout(function(){
                $('.selectpicker').selectpicker('refresh');
            },10);
        });

        Supplier.query().$promise.then(function(suppliers){
            $scope.suppliers=suppliers;
            setTimeout(function(){
                $('.selectpicker').selectpicker('refresh');
            },10);

        });

        Company.query().$promise.then(function(companies){            
            $scope.companies=companies;
            setTimeout(function(){
                $('.selectpicker').selectpicker('refresh');
            },10);
        });

        $('.datepicker').datepicker({
             format: 'yyyy-mm-dd'
        });

        $('.selectpicker').selectpicker({            
            size:3
        });

    }
]);