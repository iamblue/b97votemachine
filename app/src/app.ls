'use strict'
angular.module 'limitstyleLayoutApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
]
.config ($stateProvider, $urlRouterProvider) !->
  $urlRouterProvider.otherwise '/state1'
  $stateProvider
    .state 'state1', {
      url: '/state1'
      templateUrl: 'partials/state1.html'
    }
    .state 'state2', {
      url: '/'
      templateUrl: 'scroll.html'
      controller: ($scope) !->
        $scope.things = [
          'A'
          'Set'
          'Of'
          'Things'
        ]
    }
    .state 'state3', {
      url: '/'
      templateUrl: 'scroll.html'
      controller: ($scope) !->
        $scope.things = [
          'A'
          'Set'
          'Of'
          'Things'
        ]
    }
