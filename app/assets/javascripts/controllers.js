controllers = angular.module('controllers', ['UserControllers','ProjectControllers','SupplierControllers','CompanyControllers','uiSwitch']).factory('User', function($resource) {
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

/*controllers.service('AlertService',['ngResource',function($resource){
    controllers.constant('AlertMessages',{
        taskCreated:"Task Created",
        taskNotCreated:"Failed to Create Task"
    });
}]);
*/
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


controllers.controller('TaskPanelController', ['$scope','$rootScope','$filter','Task','USER_ROLES','Session','User','TASK_CATEGORIES', function($scope,$rootScope,$filter,Task,USER_ROLES,Session,User,TASK_CATEGORIES){

    $scope.toggleTaskPriority=function(task){
        task.priority=!task.priority;
        Task.update({taskId:task.id},task);
    }

    $scope.toggleTaskCompleted=function(task){
        task.completed=task.completed;
        if(task.completed){
            task.completed_on=new Date();
        }
        Task.update({taskId:task.id},task);
    }

    var orderBy = $filter('orderBy');

    $rootScope.$on("auth-login-success",function(){

        $scope.userRoles= USER_ROLES;

/*        User.query({user_id:Session.user_id}).$promise.then(function(result){
            $scope.setCurrentUser(result);

            console.log($scope.currentUser)

*/            Task.get({user_id:$scope.currentUser.id,completed:'f'}).$promise.then(function(result){
                $scope.tasks=result;            
            });

        });

/*    });*/

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


controllers.controller('TaskNewController', ['$scope','$timeout','Task','Company','User','TASK_CATEGORIES', function($scope,$timeout,Task,Company,User,TASK_CATEGORIES){
    
    $scope.categories=TASK_CATEGORIES;

    $scope.addTask = function(task) {
            
            newTask = new Task();
            newTask.user_id = task.user.id;
            newTask.category = task.category.code;
            newTask.company_id = task.company.id;
            newTask.priority = task.priority;
            newTask.deadline = task.deadline;
            newTask.description = task.description;
            

            
            
            newTask.$save(function(result) {
                $scope.addTimedAlert("Task Created","success",3000);

                },function(error){
                    $scope.addTimedAlert("Task Created","success",3000);
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








controllers.run(function(){
    $("#task-list").height($(window).innerHeight()-250);     
});