/**
 * Created by nicky on 6/8/15.
 */
var authService = angular.module('authentication');

authService.factory('Authentication', ['$http', '$rootScope', '$resource', '$base64',
  function ($http, $rootScope, $resource, base64) {

    var urlBase = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';

    var serviceDefinition = {};

    serviceDefinition.isAuthenticated = false;

    serviceDefinition.currentSession = null;

    serviceDefinition.getSession = function () {
      return $resource(urlBase + 'session');
    };
    serviceDefinition.authenticateUser = function (username, password, onValidated, onValidationFailed, redirectUrl) {
      setUpHttpAuthenticationHeaders(username, password);
      $resource(urlBase + 'session?').get({})
        .$promise
        .then(function(responce){
          if(responce.authenticated === true){
            serviceDefinition.currentSession = responce.sessionId;
            serviceDefinition.isAuthenticated = true;
            if(onValidated)
              onValidated();
          }
          else{
            console.log("Authentication failed");
            if(onValidationFailed){
              onValidationFailed("The supplied user name or password is incorrect." );
            }
          }
        })
        .catch (function(errorMsg) {
        console.log("Something went wrong : " + errorMsg);
        if(onValidationFailed){
          onValidationFailed("Something went wrong. Retry again." );
        }
        });
    };

    function setUpHttpAuthenticationHeaders(username, password) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + base64.encode(username + ':' + password);
    }
    return serviceDefinition;
  }]);
