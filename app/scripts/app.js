(function(){
  'use strict';
  var app;
  app = angular.module('BadDriverApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage']);
  app.config(function($stateProvider, $urlRouterProvider){
    var fbAppId;
    fbAppId = '1422387521330282';
    FB.init({
      appId: fbAppId,
      status: true,
      cookie: true,
      xfbml: true
    });
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
      url: '/index',
      resolve: {},
      templateUrl: '/views/layout/index.html',
      controller: 'indexCtrl'
    }).state('update', {
      url: '/update',
      templateUrl: '/views/layout/update.html',
      controller: 'updateCtrl'
    }).state('info', {
      url: '/info/:id',
      templateUrl: '/views/layout/info.html',
      controller: 'infoCtrl'
    });
  });
  app.run(['$rootScope', '$location', '$localStorage', '$http'].concat(function($rootScope, $location, $localStorage, $http){
    $rootScope.cCode = [];
    $rootScope.$watch(function(){
      if ($location.path() !== '/login') {
        sessionStorage.lasturl = $location.path();
      }
      return $location.path();
    }, function(a){
      console.log('url has changed: ' + a);
    });
    FB.getLoginStatus(function(response){
      var uid, accessToken, dataId;
      if (response.status === 'connected') {
        uid = response.authResponse.userID;
        accessToken = response.authResponse.accessToken;
        dataId = {
          id: uid,
          tk: accessToken
        };
        $http.post('http://127.0.0.1:3000/member/update', dataId);
        $rootScope.$apply(function(){
          $rootScope.tk = accessToken;
          $rootScope.fbid = response.authResponse.userID;
          return $rootScope.name = $localStorage.name;
        });
      } else {
        $rootScope.$apply(function(){
          $rootScope.fbid = undefined;
          return $rootScope.name = '請登入';
        });
      }
    });
  }));
}).call(this);
