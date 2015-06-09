'use strict';

/**
 * @ngdoc function
 * @name openMrsangularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openMrsangularjsApp
 */
angular.module('openMrsangularjsApp')
  .controller('MainCtrl',['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  }]);
