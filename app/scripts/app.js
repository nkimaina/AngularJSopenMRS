'use strict';

/**
 * @ngdoc overview
 * @name openMrsangularjsApp
 * @description
 * # openMrsangularjsApp
 *
 * Main module of the application.
 */
angular
  .module('openMrsangularjsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'authentication',
    'patient'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //register interceptor
    $httpProvider.interceptors.push('httpInterceptor');
    
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller:'MainCtrl',
        data : {requireLogin : true }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        data : {requireLogin : true }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/authentication/login.html',
        controller:'AuthenticationCtrl',
        params: {onSuccessRout:null, onSuccessParams:null}
      })
      .state('patientSearch', {
        url: '/patientSearch',
        templateUrl: 'views/patient/patientSearch.html',
        controller: 'PatientSearchCtrl',
        data : {requireLogin : true }
      });
  }).run(function ($rootScope, $state, $location, Authentication) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    Authentication.updateHeaders();
    var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !Authentication.isAuthenticated ;

    if(shouldLogin)
    {
      $state.go('login',{onSuccessRout:toState, onSuccessParams:toParams});
      event.preventDefault();
      return;
    }
    //else navigate to page

  });
});
