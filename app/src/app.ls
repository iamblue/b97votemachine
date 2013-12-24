'use strict'

app = window.app = angular.module 'BadDriverApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
  'ngStorage'
]

app.config ($stateProvider, $urlRouterProvider) !->

  fbAppId = '1422387521330282'
  FB.init(
    appId      : fbAppId
    status     : true
    cookie     : true
    xfbml      : true
  )

  $urlRouterProvider.otherwise '/index'
  $stateProvider
    .state 'index', {
      url: '/index'
      resolve: {
        idata: ($http)->
          $http(
            method: 'GET'
            url: 'http://api.dont-throw.com/data/all'
          )
      }
      templateUrl: '/views/layout/index.html'
      controller: 'indexCtrl'
    }
    .state 'update', {
      url: '/update'
      templateUrl: '/views/layout/update.html'
      controller: 'updateCtrl'
    }
    .state 'info', {
      url: '/info/:id'
      templateUrl: '/views/layout/info.html'
      controller: 'infoCtrl'
    }

app.run <[$rootScope $location $localStorage $http]> ++ ($rootScope, $location, $localStorage, $http) !->
  $rootScope.cCode = []

  $rootScope.$watch( ->
    if $location.path! != '/login'
      sessionStorage.lasturl = $location.path!
    $location.path!
  (a) !-> console.log 'url has changed: ' + a
  )

  $rootScope.passCheatCode = ->
    $rootScope.$apply( ->
      $rootScope.snumber = $rootScope.number 
    )
    
  FB.getLoginStatus((response) !->
    if (response.status == 'connected')
      uid = response.authResponse.userID
      accessToken = response.authResponse.accessToken
      const dataId ={
        id:uid
        tk:accessToken
      }
      $http.post 'http://api.dont-throw.com/member/update', dataId
      $rootScope.$apply( ->
        $rootScope.tk = accessToken
        $rootScope.fbid = response.authResponse.userID
        $rootScope.name = $localStorage.name
      )
    else
      $rootScope.$apply( ->
        $rootScope.fbid = undefined
        $rootScope.name = '請登入'
      )
  )
