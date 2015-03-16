ProjectControllers = angular.module('ProjectControllers', ['ngResource']);


ProjectControllers.controller('ProjectShowController', ['$scope', '$routeParams', 'Project', 'User', 'TASK_CATEGORIES', function($scope, $routeParams, Project, User, TASK_CATEGORIES) {

    var findCategory = function(selectedCategory) {
        return TASK_CATEGORIES.filter(function(category) {
            return category.code == selectedCategory

        })[0];

    }

    Project.get({
        projectId: $routeParams.projectId
    }).$promise.then(function(result) {

        angular.forEach(result.tasks, function(task, index) {
            task.category = findCategory(task.category);
        });

        $scope.project = result

    });

    $scope.updateProgress = function(progress, project_id) {

        Project.get({
            projectId: project_id
        }, function(updateProject) {
            updateProject.progress = progress;

            if (progress === 5) {
                updateProject.completed_on = new Date();
            }

            Project.update({
                projectId: project_id
            }, updateProject);
        });

        $scope.project.progress = progress;
    };

}]);

ProjectControllers.controller('CreateProjectTasksController', ['$scope', '$routeParams', 'Task', 'TASK_CATEGORIES', 'Project',
    function($scope, $routeParams, Task, TASK_CATEGORIES, Project) {

        $scope.categories = TASK_CATEGORIES;

        $scope.id = $routeParams.projectId


        Project.get({
            projectId: $scope.id
        }).$promise.then(function(result) {
            $scope.projectInformation = result;
            console.log($scope.projectInformation)
        });


        $scope.addTask = function(task) {

            newTask = new Task();
            newTask.project_id = $scope.projectInformation.id;
            newTask.user_id = $scope.projectInformation.user.id;
            newTask.category = task.category.code;
            newTask.company_id = $scope.projectInformation.company.id;
            newTask.priority = task.priority;
            newTask.deadline = task.deadline;
            newTask.description = task.description;

            newTask.$save(function(result) {
                $scope.addTimedAlert("Task Created", "success", 3000);

            }, function(error) {
                $scope.addTimedAlert("Task Created", "success", 3000);
            });
        }


        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        setTimeout(function() {
            $(".selectpicker").selectpicker();
        });

    }
]);

ProjectControllers.controller('ProjectIndexController', ['$scope', 'Project', 'User', 'USER_ROLES','TASK_CATEGORIES', function($scope, Project, User, USER_ROLES, TASK_CATEGORIES) {

    var findCategory = function(selectedCategory) {
        return TASK_CATEGORIES.filter(function(category) {
            return category.code == selectedCategory
        })[0];
    }

    $scope.updateProgress = function(progress, project_id) {

        Project.get({
            projectId: project_id
        }, function(updateProject) {
            updateProject.progress = progress;

            if (progress === 5) {
                updateProject.completed_on = new Date();
            }

            Project.update({
                projectId: project_id
            }, updateProject);
        });

        angular.forEach($scope.projects, function(project, index) {
            console.log(project)
            if (project.project_id === project_id) {
                $scope.projects[index].progress = progress;
            }
        });

    };



    if ($scope.isAdmin()) {
        Project.query().$promise.then(function(result) {
            for (project in result) {
                angular.forEach(result[project].tasks, function(task, index) {
                    task.category = findCategory(task.category);
                });
            }
            console.log(result)
            $scope.projects = result;
        });
    } else {
        var userId = $scope.currentUser.id

        Project.query({
            user_id: userId
        }).$promise.then(function(result) {
            for (project in result) {
                angular.forEach(result[project].tasks, function(task, index) {

                    task.category = findCategory(task.category);
                });
            }
            console.log(result)
            $scope.projects = result;
        });
    }

}]);


ProjectControllers.controller('ProjectNewController', ['$scope', '$location', '$timeout', 'User', 'Company', 'Supplier', 'Project',
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
                $scope.addTime
                $location.path("/projects/" + result.id + "/tasks/create");

            });
        };

        User.query().$promise.then(function(users) {
            $scope.users = users;

            $timeout(function() {
                $(".selectpicker").selectpicker('refresh');
            });
        });

        Supplier.query().$promise.then(function(suppliers) {
            $scope.suppliers = suppliers;

            $timeout(function() {
                $(".selectpicker").selectpicker('refresh');
            });
        });

        Company.query().$promise.then(function(companies) {
            $scope.companies = companies;
            $timeout(function() {
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
