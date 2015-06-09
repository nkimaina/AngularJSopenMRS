'use strict';

/**
 * @ngdoc function
 * @name openMrsangularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openMrsangularjsApp
 */
angular.module('openMrsangularjsApp')
  .controller('MainCtrl',['$scope','Authentication','$location', function ($scope, auth, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  }]);
