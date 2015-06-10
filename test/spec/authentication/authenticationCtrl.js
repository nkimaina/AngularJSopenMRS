'use strict';

describe('Controller: authenticationCtrl', function () {

  var toState = {url: '/test' };

  beforeEach(function() {
    module('authentication');
    module('openMrsangularjsApp');
  });

  //initialize the test states for ui-router
  beforeEach(module(function ($stateProvider) {
    $stateProvider.state('test-state', toState);
  }));


  var authenticationCtrl, scope, state;

  //mock ctrl parameters

  var stateParams = {
    onSuccessRout:toState,
    onSuccessParams:'my params'
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
      scope = $rootScope.$new();
      state = $state;
      authenticationCtrl = $controller('AuthenticationCtrl', {
          $scope: scope,
          Authentication:authenticationServiceMock,
          $state: $state,
          $stateParams: stateParams
        });
  }));

  it('should attach credentials to the scope and initialize it', function () {
    expect(scope.credentials).toBeDefined();
    expect(scope.credentials.username).toBeDefined();
    expect(scope.credentials.password).toBeDefined();
  });

  it('should attach errorMessage to the scope and initialize it', function () {
    expect(scope.credentials).toBeDefined();
  });

  it('should redirect user back to the page that required authentication if authentication is successful', function () {
    authenticationServiceMock.isAuthenticated = true;
    scope.login();
    scope.$apply();
    expect(state.current.name).toBe('test-state');
  });

  it('should show error message when authentication is not successful', function () {
    authenticationServiceMock.isAuthenticated = false;
    scope.login();
    expect(scope.errorMessage).toEqual(authenticationServiceMock.failedMessage);
  });


});
