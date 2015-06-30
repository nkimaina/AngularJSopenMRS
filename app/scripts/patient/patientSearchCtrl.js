/**
 * Created by nicky on 6/8/15.
 */
'use strict';


var containingModule =  angular.module('patient');

containingModule.controller('PatientSearchCtrl', ['$scope', 'Authentication','$location','Patient',
  function ($scope, Authentication, $location, Patient){

    $scope.searchText = '';
    $scope.searchFor = '';
    $scope.results = [];

    $scope.patient = { };

    //$scope.findPatients = function(){
    //  $scope.searchFor = $scope.searchText;
    //  $scope.searchText = 'Searching..';
    //  Patient.findPatients($scope.searchFor,function(searchResults){
    //    $scope.searchText = $scope.searchFor;
    //    $scope.results = searchResults;
    //  });
    //};

    $scope.findPatients = function(searchText){
      Patient.findPatients(searchText,function(searchResults){
            $scope.results = searchResults;
      });
    }


}]);
