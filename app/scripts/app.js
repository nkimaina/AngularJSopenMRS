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
    'authentication',
    'patient'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/authentication/login.html',
        controller: 'AuthenticationCtrl'
      })
      .when('/patientSearch', {
        templateUrl: 'views/patient/patientSearch.html',
        controller: 'PatientSearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
