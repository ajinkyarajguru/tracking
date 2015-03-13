controllers = angular.module('controllers', ['UserControllers','uiSwitch']).factory('User', function($resource) {
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
    return $resource('/api/tasks/:taskId',{},{
        'get':{method:'GET',isArray:true},
        'update':{method:'PUT'}
    });
});

/*controllers.service('UserService',['ngResource',function($resource){
    return $resource('/api/users/:userId', null, {

    });
}]);

controllers.service('CompanyService',['ngResource',function($resource){
    return $resource('/api/companies/:companiesId', null, {

    });
}]);

controllers.service('ProjectService',['ngResource',function($resource){
    return $resource('/api/projects/:projectsId', null, {
        'update':{method:'PUT'}
    });
}]);

controllers.service('SupplierService',['ngResource',function($resource){
    return $resource('/api/tasks/:tasksId', null, {
        'get':{method:'GET',isArray:true},
        'update':{method:'PUT'}
    });
}]);*/

/*controllers.service('TaskService',['ngResource','Task',function($resource){

    var tasks=[];
    this.add=function(task){

    }
    this.getTasks=function(user){
        return tasks;
    }
    this.togglePriority=function(task){

    }
    this.toggleCompleted=function(task){
        task.priority=!task.priority;
        Task.update({taskId:task.id},task);
    }

    return this;
}]);
*/


controllers.controller('TaskPanelController', ['$scope','$rootScope','$filter','Task','TASK_CATEGORIES', function($scope,$rootScope,$filter,Task,TASK_CATEGORIES){

    $scope.toggleTaskPriority=function(task){
        task.priority=!task.priority;
        Task.update({taskId:task.id},task);
    }

    $scope.toggleTaskCompleted=function(task){
        task.completed=task.completed;
        Task.update({taskId:task.id},task);
    }

    var orderBy = $filter('orderBy');

    $rootScope.$on("auth-login-success",function(){
        Task.get({user_id:$scope.currentUser.id,completed:'f'}).$promise.then(function(result){
            $scope.tasks=result;            
        });
    });

    $('.datepicker').datepicker({
       format: 'yyyy-mm-dd',
       autoclose: true
    });

    $scope.order=function(){

        var sorted=new Array();
        var priority=new Array();
        var unsorted=new Array();
        var finalSort=new Array();
        for(task in $scope.tasks){

            if($scope.tasks[task].priority){
                priority.push($scope.tasks[task]);
            }else if($scope.tasks[task].days_to_deadline!=='no date'){
                sorted.push($scope.tasks[task]);
            }else{
                unsorted.push($scope.tasks[task]);
            }
        }
        console.log("sorted");
        console.log(sorted);
        console.log("priority");
        console.log(priority);
        console.log("unsorted");
        console.log(unsorted);

        sorted=orderBy(sorted,sorted.days_to_deadline,true);
        console.log("sorted Final");
        console.log(sorted);
        priority=orderBy(priority,priority.days_to_deadline,true);
        console.log("priorityFinal");
        console.log(priority);

        $scope.tasks=priority.concat(sorted).concat(unsorted);
    }

    
}]);


controllers.controller('CreateProjectTasksController', ['$scope','$routeParams','Task','TASK_CATEGORIES','Project',
 function ($scope, $routeParams,Task,TASK_CATEGORIES,Project) {
    
    $scope.categories=TASK_CATEGORIES;

    $scope.id = $routeParams.projectId


    Project.get({projectId:$scope.id}).$promise.then(function(result){
        $scope.projectInformation=result;
        console.log($scope.projectInformation)
    });


    $scope.addTask=function(task){

        newTask = new Task();
        newTask.project_id=$scope.projectInformation.id;
        newTask.user_id = $scope.projectInformation.user.id;
        newTask.category = task.category.code;
        newTask.company_id = $scope.projectInformation.company.id;
        newTask.priority = task.priority;
        newTask.deadline = task.deadline;
        newTask.description = task.description;

        newTask.$save(function(result) {
                
        });
    }

    
    $('.datepicker').datepicker({
        format:'yyyy-mm-dd',
        autoclose:true
    });

    setTimeout(function(){$(".selectpicker").selectpicker();});

}]);

controllers.controller('CompanyIndexController', ['$scope','Company', function($scope,Company){
    Company.query().$promise.then(function(result){
        $scope.companies=result;
    });
}]);


controllers.controller('ProjectShowController', ['$scope','$routeParams','Project','User','TASK_CATEGORIES', function($scope,$routeParams,Project,User,TASK_CATEGORIES){
    
    var findCategory=function(selectedCategory){
         return TASK_CATEGORIES.filter(function(category){
            return category.code==selectedCategory
                
            })[0];
        
    }


    Project.get({projectId:$routeParams.projectId}).$promise.then(function(result){

        angular.forEach(result.tasks,function(task,index){
            task.category=findCategory(task.category);
        });

        $scope.project=result

        console.log($scope.project)
    });

    
    $scope.updateProgress=function(progress,project_id){

            Project.get({projectId:project_id},function(updateProject){
                updateProject.progress=progress;
                            
                if(progress===5){
                    updateProject.completed_on=new Date();
                }
                
                Project.update({projectId:project_id},updateProject);
            });

            $scope.project.progress=progress;
        };

}]);

controllers.controller('ProjectIndexController', ['$scope','Project','User','USER_ROLES', function($scope,Project,User,USER_ROLES){

     
    if($scope.isAdmin()){

        Project.query().$promise.then(function(result){
            $scope.projects=result;
        });        
    }else{
        var userId=$scope.currentUser.id

        Project.query({user_id:userId}).$promise.then(function(result){
            $scope.projects=result;
        });
    }
    
}]);



controllers.controller('TaskNewController', ['$scope','$timeout','Task','Company','User','TASK_CATEGORIES', function($scope,$timeout,Task,Company,User,TASK_CATEGORIES){
    
    $scope.categories=TASK_CATEGORIES;

    $scope.addTask = function(task) {
            console.log(task)
            newTask = new Task();
            newTask.user_id = task.user.id;
            newTask.category = task.category.code;
            newTask.company_id = task.company.id;
            newTask.priority = task.priority;
            newTask.deadline = task.deadline;
            newTask.description = task.description;
            $.extend($scope.tasks,newTask);

            console.log($scope.tasks);
            
            newTask.$save(function(result) {


                
            });
        };
    
    Company.query().$promise.then(function(companies) {
            $scope.companies = companies;
            console.log($scope.companies);
            $timeout(function(){
                $(".selectpicker").selectpicker('refresh');
            });
        });    

    User.query().$promise.then(function(users) {
            $scope.users = users;
           
            $timeout(function(){
                $(".selectpicker").selectpicker('refresh');
            });
        });

    $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
    });

    setTimeout(function(){$(".selectpicker").selectpicker();});

}]);



controllers.controller('ProjectNewController', ['$scope', '$location','$timeout', 'User', 'Company', 'Supplier', 'Project',
    function($scope, $location, $timeout, User, Company, Supplier, Project) {

        $scope.addProject = function(project) {
            
            newProject = new Project();
            newProject.user_id = project.user.id;
            newProject.supplier_id = project.supplier.id;
            newProject.company_id = project.company.id;
            newProject.projected_revenue = project.projected_revenue;
            newProject.start_on = project.start_on;
            newProject.planned_end = project.planned_end;
            
            newProject.$save(function(result) {
            
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
            format: 'yyyy-mm-dd',
            autoclose: true
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

controllers.run(function(){
    $("#task-list").height($(window).innerHeight()-250);     
});