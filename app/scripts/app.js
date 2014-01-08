(function(){
  'use strict';
  var app;
  app = window.app = angular.module('BadDriverApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage', 'files']);
  app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
      url: '/index',
      templateUrl: '/views/layout/index.html',
      controller: 'indexCtrl'
    }).state('update', {
      url: '/update',
      templateUrl: '/views/layout/update.html',
      controller: 'updateCtrl'
    }).state('detail', {
      url: '/detail/:id',
      resolve: {
        infodata: function($http, $stateParams, $location){
          return $http({
            method: 'GET',
            url: 'http://api.dont-throw.com/data/get/' + $stateParams.id
          }).success(function(d){
            if (d.data === null) {
              alert('很抱歉找不到此資料！');
              return $location.path('/');
            }
          });
        }
      },
      templateUrl: '/views/layout/detail.html',
      controller: 'detailCtrl'
    });
  });
  app.run(['$rootScope', '$location', '$localStorage', '$http'].concat(function($rootScope, $location, $localStorage, $http){}));
}).call(this);
