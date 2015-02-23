controllers = angular.module('controllers', []).factory('User', function($resource) {
    return $resource('/api/users/:userId');
}).factory('Project', function($resource) {
    return $resource('/api/projects/:projectId',null,{
        'update':{ method:'PUT' }
    });
}).factory('Company', function($resource) {
    return $resource('/api/companies/:companyId');
}).factory('Supplier', function($resource) {
    return $resource('/api/suppliers/:supplierId');
});

controllers.controller('LoginController', ['$scope', function ($scope) {
    
}]);

controllers.controller("UserController", ['$scope', '$routeParams', 'User', '$filter','Project',
    function($scope, $routeParams, User, $filter, Project) {

        var orderBy = $filter('orderBy');

        $scope.id = $routeParams.userId

        User.get({
            userId: $scope.id
        }).$promise.then(function(result) {
            $scope.user = result;
            $scope.projects = $scope.user.projects;
            $scope.order($scope.column, $scope.ascending);
        });

        $scope.updateProgress=function(progress,project_id){

            Project.get({projectId:project_id},function(updateProject){
                updateProject.progress=progress;
                            
                if(progress===5){
                    updateProject.completed_on=new Date();
                }
                
                Project.update({projectId:project_id},updateProject);
            });

            angular.forEach($scope.projects,function(project,index){
                if(project.project_id===project_id){
                    $scope.projects[index].progress=progress;
                }
            });

        };

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
            newUser.$save(function(result) {
                console.log(result)
            });
        };

        $scope.reset = function() {
            $scope.user = $scope.master;
        };

    }
]);

controllers.controller('ProjectsFormController', ['$scope', '$location','$timeout', 'User', 'Company', 'Supplier', 'Project',
    function($scope, $location, $timeout, User, Company, Supplier, Project) {

        

        $scope.addProject = function(project) {
            console.log(project.company)
            newProject = new Project();
            newProject.user_id = project.user.id;
            newProject.supplier_id = project.supplier.id;
            newProject.company_id = project.company.id;
            newProject.projected_revenue = project.projected_revenue;
            newProject.start_on = project.start_on;
            newProject.planned_end = project.planned_end;
            
            newProject.$save(function(result) {
                console.log(result);
                if(result==true){
                    $location.path("/projects");
                }
            });
        };

        User.query().$promise.then(function(users) {
            $scope.users = users;
            $timeout(function(){
                $(".selectpicker").selectpicker('refresh');
            });
        });

        Supplier.query().$promise.then(function(suppliers) {
            $scope.suppliers = suppliers;
            $timeout(function(){
                $(".selectpicker").selectpicker('refresh');
            });
        });

        Company.query().$promise.then(function(companies) {
            $scope.companies = companies;
            $timeout(function(){
                $(".selectpicker").selectpicker('refresh');
            });
        });

        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd'
        });

        $(".selectpicker").selectpicker();

    }
]);

controllers.controller('SupplierFormController', ['$scope', 'Supplier',
    function($scope, Supplier) {

        $scope.master = {};

        $scope.supplier = {};

        $scope.update = function(supplier) {
            newSupplier = new Supplier();
            newSupplier.supplier = supplier;
            newSupplier.$save(function(result) {});
        };

        $scope.reset = function() {
            $scope.supplier = $scope.master;
        };

    }
]);

controllers.controller('CompanyFormController', ['$scope', 'Company',
    function($scope, Company) {

        $scope.master = {};

        $scope.company = {};

        $scope.update = function(company) {
            newCompany = new Company();
            newCompany.company = company;
            newCompany.$save(function(result) {});
        };

        $scope.reset = function() {
            $scope.company = $scope.master;
        };

    }
]);