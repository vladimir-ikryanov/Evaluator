var evaluatorsApp = angular.module('EvaluatorsApp', ['ngRoute']);

evaluatorsApp.controller('EvaluatorsCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('data').success(function (data, status, headers, config) {
    $scope.pipelines = data.pipelines;
    $scope.evaluators = data.evaluators;
    $scope.pipelinePhases = data.pipelinePhases;
    $scope.evaluatorPipelinePhases = data.evaluatorPipelinePhases;
  });
}]);

evaluatorsApp.controller('NewEvaluatorFormCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.formData = {};
  $scope.submitForm = function () {
    $http.post('/evaluator/new', $scope.formData).success(function (data) {
      if (data.success) {
        //$scope.evaluators.unshift(data.evaluator);
        // Hide Modal dialog
        $('#newEvaluatorModal').modal('hide');
        // Reset form data
        $scope.formData = {};
      }
    });
  };
}]);