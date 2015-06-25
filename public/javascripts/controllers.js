var evaluatorsApp = angular.module('EvaluatorsApp', ['ngRoute']);

evaluatorsApp.controller('EvaluatorsCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('evaluators').success(function(data, status, headers, config) {
    // Request evaluators json from web server and store it into evaluators variable.
    $scope.evaluators = data;
  });
}]);