controllers = angular.module('controllers', ['UserControllers']).factory('User', function($resource) {
    return $resource('/api/users/:userId');
}).factory('Project', function($resource) {
    return $resource('/api/projects/:projectId',null,{
        'update':{ method:'PUT' }
    });
}).factory('Company', function($resource) {
    return $resource('/api/companies/:companyId');
}).factory('Supplier', function($resource) {
    return $resource('/api/suppliers/:supplierId');
}).factory('Task',function($resource){
    return $resource('/api/tasks/taskId');
});


controllers.controller('CreateProjectTasksController', ['$scope','$routeParams', 'Project',
 function ($scope, $routeParams, Project) {
    
    $scope.id = $routeParams.projectId
    Project.get({projectId:$scope.id}).$promise.then(function(result){
        
    });
}]);

controllers.controller('CompanyIndexController', ['$scope','Company', function($scope,Company){
    
    Company.query().$promise.then(function(result){
        $scope.companies=result;
    });
}]);


controllers.controller('ProjectShowController', ['$scope','Project','User', function($scope,Project,User){
    
}]);

controllers.controller('ProjectIndexController', ['$scope','Project','User', function($scope,Project,User){
    
}]);

controllers.controller('TasksNewController', ['$scope','Task','Company','User', function($scope,Task,Company,User){
    
}]);



controllers.controller('ProjectNewController', ['$scope', '$location','$timeout', 'User', 'Company', 'Supplier', 'Project',
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
                    $location.path("/projects/"+result.id+"/tasks/create");
                
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

controllers.controller('SupplierNewController', ['$scope', 'Supplier',
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

controllers.controller('CompanyNewController', ['$scope', 'Company',
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

