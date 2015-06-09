/**
 * Created by nicky on 6/8/15.
 */
'use strict';


var authModule =  angular.module('authentication');

authModule.controller('AuthenticationCtrl', ['$scope', 'Authentication','$location',
  function ($scope, Authentication, $location) {
  var credentials = {
    username:'',
    password:''
  };
  $scope.credentials = credentials;
  $scope.errorMessage = '';
  $scope.login = function(){
    $scope.errorMessage = '';
    Authentication.authenticateUser($scope.credentials.username,$scope.credentials.password,onSuccessfulValidation,onFailedValidation);
  };

  function onSuccessfulValidation(){
    //redirect to patient search view
    $location.path('/patientSearch');
  };

  function onFailedValidation(reason){
    $scope.errorMessage = reason;
  };

}]);
