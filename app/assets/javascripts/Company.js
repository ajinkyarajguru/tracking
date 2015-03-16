CompanyControllers=angular.module('CompanyControllers',['ngResource']);

CompanyControllers.controller('CompanyIndexController', ['$scope','Company', function($scope,Company){
    Company.query().$promise.then(function(result){
        $scope.companies=result;
    });
}]);

CompanyControllers.controller('CompanyNewController', ['$scope', 'Company',
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