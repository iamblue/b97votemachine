'use strict'
angular.module 'BadDriverApp', [
  'ngCookies'
  'ngResource'
  'ngSanitize'
  'ui.router'
]
.config ($stateProvider, $urlRouterProvider) !->
  $urlRouterProvider.otherwise '/index'
  $stateProvider
    .state 'index', {
      url: '/index'
      templateUrl: '/views/layout/index.html'
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
page = sections.create()
page.section 1, (section) !->
  target = document.querySelector('#section-2-opacity')
  bg-pattern = document.querySelector('.bg-pattern')
  # logo = document.querySelector('#logo')
  # content = document.querySelector('#')
  # section.transitions [
  #   key: 'opacity'
  #   start: 0 #螢幕最下0 #物件頂點道螢幕最上100 #物件底部超過點到螢幕最上200 
  #   end: 100
  #   from: 0  #
  #   to: 1
  #   format: '%s' #'%spx'
  #   target: target
  #   prefix: true
  #   handler: (from, come, progress) ->
  #     from
  #     console.log come
  #     console.log progress
  # ]
  section.transitions [
    key: 'margin-left'
    start: 0 #螢幕最下0 #物件頂點道螢幕最上100 #物件底部超過點到螢幕最上200 
    end: 100
    from: 0  #
    to: 200
    format: '%spx' #'%spx'
    target: target
    prefix: true
    # handler: (from, come, progress) ->
    #   console.log from
    #   console.log come
    #   console.log progress
    #   ((from - come)/progress)
  ]
  section.transitions [ 
    key: 'opacity'
    start: 0 
    end: 100
    from: 1
    to: 0
    format: '%s'
    target: bg-pattern
    prefix:true
  ]
  section.on 'progress', (progress) !->
    # console.log progress


window.onload = !->
  page.init()