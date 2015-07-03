/**
 * Created by nicky on 6/8/15.
 */
'use strict';
//this is supposed to be a edasdasd

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

  function activate(){
    if(Authentication.isAuthenticated === true && $stateParams.onSuccessRout === null){
        $state.go('home');
    }
  }
  activate();
  function onSuccessfulValidation(){
    if($stateParams.onSuccessRout){
      $state.go($stateParams.onSuccessRout,$stateParams.onSuccessParams);
    }
    else {
      $state.go('home');
    }
  }

  function onFailedValidation(reason){
    $scope.errorMessage = reason;
  }

}]);
