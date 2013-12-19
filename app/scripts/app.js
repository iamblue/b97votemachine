(function(){
  'use strict';
  var page;
  angular.module('BadDriverApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router']).config(function($stateProvider, $urlRouterProvider){
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
      templateUrl: '/views/layout/index.html',
      controller: 'indexCtrl'
    });
  });
  page = sections.create();
  page.section(1, function(section){
    var target, bgPattern;
    target = document.querySelector('#section-2-opacity');
    bgPattern = document.querySelector('.bg-pattern');
    section.transitions([{
      key: 'margin-left',
      start: 0,
      end: 100,
      from: 0,
      to: 200,
      format: '%spx',
      target: target,
      prefix: true
    }]);
    section.transitions([{
      key: 'opacity',
      start: 0,
      end: 100,
      from: 1,
      to: 0,
      format: '%s',
      target: bgPattern,
      prefix: true
    }]);
    section.on('progress', function(progress){});
  });
  window.onload = function(){
    page.init();
  };
}).call(this);
