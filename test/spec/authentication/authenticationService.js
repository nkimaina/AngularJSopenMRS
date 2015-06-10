/**
 * Created by nicky on 6/10/15.
 */
'use strict';

describe("Authentication Service Unit Tests", function() {

  beforeEach(function() {
    module('authentication');
    module('openMrsangularjsApp');
  });

  var baseURl = 'https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/';

  var callbacks = {
    onSuccessCalled:false,
    onFailedCalled:false,
    message:null,
    onSuccessfulAuthentication: function(){
      callbacks.onSuccessCalled = true;
    },
    onFailedAuthentication: function(message){
      callbacks.onFailedCalled = true;
      callbacks.message = message;
    }
  }

  var httpBackend, authenticationService

  var mockAuthenticatedSession = {
    authenticated:true,
    sessionId:"test-authenticated-session"
  };

  var mockNotAuthenticatedSession = {
    authenticated:false,
    sessionId:"test-notAuthenticated-session"
  };

  beforeEach(inject(function ($injector) {
    httpBackend = $injector.get('$httpBackend');
    authenticationService = $injector.get('Authentication');
  }));

  beforeEach(function() {
    httpBackend.when('GET', 'views/authentication/login.html').respond(function() {
      return [200, null, {}];
    });
    httpBackend.flush();
  });

  afterEach (function () {
    httpBackend.verifyNoOutstandingExpectation ();
    httpBackend.verifyNoOutstandingRequest ();
  });

  it('should have Authentication service defined', function () {
    expect(authenticationService).toBeDefined();
  });

  it('should make an api call to the session resource when authentication is called', function(){
    httpBackend.expectGET(baseURl+ 'session?').respond(mockAuthenticatedSession);
    authenticationService.currentSession =null;
    authenticationService.authenticateUser('username','password',function(){}, function(){});
    httpBackend.flush();
    expect(authenticationService.currentSession).toEqual(mockAuthenticatedSession.sessionId);
  });

  it('should call the onSuccess callback when authenticateUser is called with correct credentials', function(){
    httpBackend.expectGET(baseURl+ 'session?').respond(mockAuthenticatedSession);
    callbacks.onSuccessCalled = false;
    callbacks.onFailedCalled = false;
    authenticationService.authenticateUser('username','password',callbacks.onSuccessfulAuthentication, callbacks.onFailedAuthentication);
    httpBackend.flush();
    expect(callbacks.onSuccessCalled).toEqual(true);
    expect(callbacks.onFailedCalled).toEqual(false);
  });

  it('should call the onFailed callback when authenticateUser is called with not correct credentials', function(){
    httpBackend.expectGET(baseURl+ 'session?').respond(mockNotAuthenticatedSession);
    callbacks.onSuccessCalled = false;
    callbacks.onFailedCalled = false;
    callbacks.message = '';
    authenticationService.authenticateUser('username','password',callbacks.onSuccessfulAuthentication, callbacks.onFailedAuthentication);
    httpBackend.flush();
    expect(callbacks.onSuccessCalled).toEqual(false);
    expect(callbacks.onFailedCalled).toEqual(true);
    expect(callbacks.message).toBeDefined();
    expect(callbacks.message.trim()).not.toEqual('');
  });

});
