/**oo
 * Created by nicky on 6/8/15. this is  a c
 */

'use strict';

var authService = angular.module('authentication');

authService.factory('Authentication', ['$http', '$rootScope', '$resource', '$base64', '$cookies',
  function ($http, $rootScope, $resource, base64, $cookies) {

    var urlBase = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';

    var serviceDefinition = {};

    serviceDefinition.isAuthenticated = false;

    serviceDefinition.updateHeaders = function(){
      serviceDefinition.isAuthenticated = true;
     /* var authHeader = serviceDefinition.getAuthenticationCookie();
      if(authHeader){
        serviceDefinition.isAuthenticated = true;
        setUpHttpAuthenticationHeaders(null,null,authHeader);
       */
    };

    serviceDefinition.currentSession = null;

    serviceDefinition.getSession = function () {
      return $resource(urlBase + 'session');
    };
    serviceDefinition.authenticateUser = function (username, password, onValidated, onValidationFailed) {
      setUpHttpAuthenticationHeaders(username, password);
      $resource(urlBase + 'session?').get({})
        .$promise
        .then(function(responce){
          if(responce.authenticated === true){
            serviceDefinition.currentSession = responce.sessionId;
            serviceDefinition.isAuthenticated = true;
            serviceDefinition.setAuthenticationCookie(username, password);
            if(onValidated){
              onValidated();
            }
          }
          else{
            console.log('Authentication failed');
            if(onValidationFailed){
              onValidationFailed('The supplied user name or password is incorrect.' );
            }
          }
        })
        .catch (function(errorMsg) {
        console.log('Something went wrong : ' + errorMsg);
        if(onValidationFailed){
          onValidationFailed('Something went wrong. Retry again.' );
        }
        });
    };
    serviceDefinition.setAuthenticationCookie = function (username, password){
      var value = 'Basic ' + base64.encode(username + ':' + password);
      $cookies.put('Authorization',value);
    };

    serviceDefinition.getAuthenticationCookie =function (){
      return $cookies.get('Authorization');
    };

    function setUpHttpAuthenticationHeaders(username, password, hashedValue) {
      if(hashedValue){
        $http.defaults.headers.common.Authorization = hashedValue;
        return;
      }
      $http.defaults.headers.common.Authorization = 'Basic ' + base64.encode(username + ':' + password);
    }


    return serviceDefinition;
  }]);
