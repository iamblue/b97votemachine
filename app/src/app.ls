'use strict'

app = window.app = angular.module 'BadDriverApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
  'ngStorage'
  'files'
]

app.config ($stateProvider, $urlRouterProvider, $httpProvider) !->
  delete $httpProvider.defaults.headers.common['X-Requested-With']
  
  $urlRouterProvider.otherwise '/index'
  $stateProvider
    .state 'index', {
      url: '/index'
      templateUrl: '/views/layout/index.html'
      controller: 'indexCtrl'
    }

app.run <[$rootScope $location $localStorage $http]> ++ ($rootScope, $location, $localStorage, $http) !->
  
