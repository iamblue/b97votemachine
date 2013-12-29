'use strict'

app = window.app = angular.module 'BadDriverApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
  'ngStorage'
  'files'
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
            url: 'http://api.dont-throw.com/data/last'
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
    .state 'detail', {
      url: '/detail/:id'
      resolve:{
        infodata:($http,$stateParams,$location)->
          $http(
            method:'GET'
            url: 'http://api.dont-throw.com/data/get/'+$stateParams.id
          ).success((d)->
            if(d.data == null)
              alert('很抱歉找不到此資料！')
              $location.path('/')
          )
      }
      templateUrl: '/views/layout/detail.html'
      controller: 'detailCtrl'
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
