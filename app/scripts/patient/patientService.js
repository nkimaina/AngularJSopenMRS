/**
 * Created by nicky on 6/8/15.
 */

  'use strict';

var authService = angular.module('patient');

authService.factory('Patient', ['$http', '$resource',
  function ($http, $resource) {

    var urlBase = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';

    var serviceDefinition = {};

    serviceDefinition.findPatients = function(searchvalue, onQueryCompleted) {

      $resource(urlBase + 'patient?=q:text&v=custom:(uuid,person)',{text:'@q'}).get({ q: searchvalue })
        .$promise
        .then(function(responce){
          onQueryCompleted(responce.results);
        })
        .catch (function(errorMsg) {
         console.log('Something went wrong : ' + errorMsg);
      });
    };

    return serviceDefinition;
  }]);
