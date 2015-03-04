UserControllers = angular.module('UserControllers',[]);

UserControllers.factory('User', function($resource) {
    return $resource('/api/users/:userId');
}).factory('Project', function($resource) {
    return $resource('/api/projects/:projectId',null,{
        'update':{ method:'PUT' }
    });
});

UserControllers.controller("UserShowController", ['$scope', '$routeParams', 'User', '$filter','Project',
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



UserControllers.controller("UserIndexController", ['$scope', 'User',
    function($scope, User) {

        User.query().$promise.then(function(result) {
            $scope.users = result;
        });

    }
]);


UserControllers.controller('UserNewController', ['$scope', 'User',
    function($scope, User) {

        $scope.master = {};

        $scope.user = {};

        $scope.update = function(user) {
            newUser = new User();
            newUser.user = user;
            newUser.$save(function(success) {
                console.log(success)
            },function(error){
                console.log(error)
            });
        };

        $scope.reset = function() {
            $scope.user = $scope.master;
        };

    }
]);
