/**
 * Created by nicky on 6/8/15.
 */
var authService = angular.module('patient');

authService.factory('Patient', ['$http', '$resource',
  function ($http, $resource) {

    var urlBase = 'https://10.50.80.75:8443/amrs/ws/rest/v1/';

    var serviceDefinition = {};

    serviceDefinition.findPatients = function(searchvalue, onQueryCompleted) {

      $resource(urlBase + 'patient?=q:text&limit=10',{text:'@q'}).get({ q: searchvalue })
        .$promise
        .then(function(responce){
          onQueryCompleted(responce.results);
        })
        .catch (function(errorMsg) {
         console.log("Something went wrong : " + errorMsg);
      });
    };

    return serviceDefinition;
  }]);
