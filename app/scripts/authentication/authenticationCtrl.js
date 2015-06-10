/**
 * Created by nicky on 6/8/15.
 */
'use strict';


var authModule =  angular.module('authentication');

authModule.controller('AuthenticationCtrl', ['$scope', 'Authentication','$state','$stateParams',
  function ($scope, Authentication,$state, $stateParams) {
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
    if($stateParams.onSuccessRout){
      $state.go($stateParams.onSuccessRout,$stateParams.onSuccessParams);
    }
  }

  function onFailedValidation(reason){
    $scope.errorMessage = reason;
  }

}]);
