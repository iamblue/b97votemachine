(function(){
  var page;
  angular.module('BadDriverApp').controller('indexCtrl', ['$scope', '$location', '$rootScope', '$localStorage', '$http'].concat(function($scope, $location, $rootScope, $localStorage, $http){
    page.init();
    $http.defaults.useXDomain = true;
    $scope.update = function(){
      console.log('123');
      if ($rootScope.fbid) {
        alert('123');
        return $location.path('/update');
      } else {
        return FB.login(function(res){
          console.log(res);
          if (res.authResponse) {
            FB.api('/me', function(response){
              var fb_uid, fb_name, fb_first_name, fb_last_name, fb_link, fb_username, fb_work, fb_inspirational_people, fb_gender, fb_email, fb_verify, data;
              console.log(response);
              fb_uid = response.id;
              fb_name = response.name;
              fb_first_name = response.first_name;
              fb_last_name = response.last_name;
              fb_link = response.link;
              fb_username = response.name;
              fb_work = response.work;
              fb_inspirational_people = response.inspirational_people;
              fb_gender = response.gender;
              fb_email = response.email;
              fb_verify = response.verified;
              $rootScope.$apply(function(){
                $localStorage.name = response.name;
                $rootScope.name = response.name;
                $rootScope.login = true;
                $rootScope.first_name = response.first_name;
                $rootScope.last_name = response.last_name;
              });
              $location.path('/');
              data = {
                fb_name: response.name,
                thirdId: fb_uid,
                email: fb_email,
                thirdparty_type: 'fb'
              };
              $http.post('http://127.0.0.1:3000/member/add', data);
            }, {
              scope: 'email,publish_actions'
            });
          }
          return false;
        });
      }
    };
  })).controller('updateCtrl', ['$scope', '$location', '$http', '$rootScope'].concat(function($scope, $location, $http, $rootScope){
    $http.defaults.useXDomain = true;
    $scope.send = function(){
      var data;
      data = {
        id: $rootScope.fbid,
        tk: $rootScope.tk,
        urlid: $scope.url,
        number: $scope.number,
        city: $scope.city,
        location: $scope.location,
        description: $scope.description,
        fbid: $rootScope.fbid
      };
      return $http.post('http://127.0.0.1:3000/data/add', data);
    };
  }));
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
}).call(this);
