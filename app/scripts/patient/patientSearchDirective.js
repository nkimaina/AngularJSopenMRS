/**
 * Created by nicky on 6/11/15.
 */

var containingModule =  angular.module('patient');

containingModule.directive('patientSearch', function() {
  return {
    restrict: 'EA',
    templateUrl: 'views/patient/patientSearch.html',
    controller:'PatientSearchCtrl'
  };
});
