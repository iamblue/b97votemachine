'use strict'

(angular.module 'limitstyleLayoutApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
]).config (($routeProvider) ->
  ($routeProvider.when '/', {
    templateUrl: 'views/main.html'
    controller: 'MainCtrl'
  }).otherwise {redirectTo: '/'}) 