var evaluatorsApp = angular.module('EvaluatorsApp', ['ngRoute']);

evaluatorsApp.controller('EvaluatorsCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.formData = {};

  $http.get('data').success(function (data) {
    $scope.pipelines = data.pipelines;
    $scope.evaluators = data.evaluators;
    $scope.pipelinePhases = data.pipelinePhases;
    $scope.evaluatorPipelinePhases = data.evaluatorPipelinePhases;

    resetFormData($scope);
  });

  $scope.newEvaluator = function () {
    $http.post('/evaluator/new', $scope.formData).success(function (data) {
      if (data.success) {
        $scope.evaluators.unshift(data.evaluator);
        $('#newEvaluatorModal').modal('hide');
        $('#newEvaluatorErrorMessage').hide();
        resetFormData($scope);
      } else {
        $('#newEvaluatorErrorMessage').show();
        $scope.errorMessage = data.errorMessage;
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
        if (index > -1) {
          $scope.evaluators.splice(index, 1);
        }
      } else {
        console.error('Failed to delete Evaluator');
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