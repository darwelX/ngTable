'use strict';

/**
 * @ngdoc overview
 * @name backendfastmoneyApp
 * @description
 * # backendfastmoneyApp
 *
 * Main module of the application.
 */
angular
  .module('backendfastmoneyApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'satellizer',
    'vcRecaptcha',
    'naif.base64',
    'validation.match',
    'angularLoad',
    'pascalprecht.translate',
    'LocalStorageModule',
    'ui.utils.masks',
    'fiestah.money',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/banks/banks.list.html',
        controller: 'BanksCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/newbank', {
        templateUrl: 'views/banks/new.bank.html',
        controller: 'BanksCtrl',
        controllerAs: 'vm'
      });
  });
