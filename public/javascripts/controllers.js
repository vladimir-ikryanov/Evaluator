var evaluatorsApp = angular.module('EvaluatorsApp', ['ngRoute']);

evaluatorsApp.controller('EvaluatorsCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.formData = {};

  $http.get('data').success(function (data, status, headers, config) {
    $scope.pipelines = data.pipelines;
    $scope.evaluators = data.evaluators;
    $scope.pipelinePhases = data.pipelinePhases;
    $scope.evaluatorPipelinePhases = data.evaluatorPipelinePhases;

    resetFormData($scope);
  });

  $scope.submitForm = function () {
    $http.post('/evaluator/new', $scope.formData).success(function (data) {
      if (data.success) {
        $scope.evaluators.unshift(data.evaluator);
        $('#newEvaluatorModal').modal('hide');
        resetFormData($scope);
      } else {
        console.error('Failed to create a new Evaluator');
      }
    });
  };

  $scope.deleteEvaluator = function (evaluator) {
    if (!confirm('Delete ' + evaluator.email + '?')) {
      return;
    }
    $http.post('/evaluator/delete', {evaluator: evaluator}).success(function(data) {
      if (data.success) {
        var index = $scope.evaluators.indexOf(evaluator);
        console.log(index);
        if (index > -1) {
          $scope.evaluators.splice(index, 1);
        }
      }
    });
  };
}]);

var resetFormData = function($scope) {
  $scope.formData.email = '';
  $scope.formData.firstName = '';
  if ($scope.pipelines.length > 0) {
    $scope.formData.pipelineId = $scope.pipelines[0]._id;
  }
};