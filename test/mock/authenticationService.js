/**
 * Created by nicky on 6/10/15.
 */

'use strict';

var authenticationServiceMock ={
  isAuthenticated:false,
  failedMessage:"authentication failed",
  authenticateUser :
    function(username, password,onSuccessfulAuthentication, onFailedAuthentication){

      if(this.isAuthenticated === true)
        onSuccessfulAuthentication();
      else
        onFailedAuthentication(this.failedMessage);

    }
};

