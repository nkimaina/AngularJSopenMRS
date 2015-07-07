/**oo
 * Created by nicky on 6/8/15. this is  a c
 */

'use strict';

var authService = angular.module('authentication');

authService.factory('httpInterceptor', ['$q',
  function ($q) {

	function canRecover(obj){
		return false;
	}
	return {
		// optional method
    'request': function(config) {
      // do something on success
      return config;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    }
		
	};
  }]);