(function(){
  var cheatcodeDirective;
  cheatcodeDirective = function(){
    return {
      restrict: 'A',
      link: function(scope, elem, attr){
        console.log(scope);
        console.log('123');
        console.log(elem);
        elem.bind('keypress', function(e){
          switch (e.which) {
          case 98:
            return scope.$apply(function(){
              return scope.cCode.push(98);
            });
          case 97:
            scope.$apply(function(){
              return scope.cCode.push(97);
            });
            if (scope.cCode.length === 2 && scope.cCode[0] === 98) {
              console.log('hihi');
              return alert('boombbbbbb');
            } else {
              return scope.cCode.length = 0;
            }
            break;
          default:
            return scope.$apply(function(){
              return scope.cCode.length = 0;
            });
          }
        });
      }
    };
  };
  app.controller('indexCtrl', ['$scope', '$location', '$rootScope', '$localStorage', '$http'].concat(function($scope, $location, $rootScope, $localStorage, $http){
    page.init();
    $http.defaults.useXDomain = true;
    $scope.cCode = [];
    $scope.update = function(){
      console.log('123');
      if ($rootScope.fbid) {
        return $location.path('/update');
      } else {
        return FB.login(function(res){
          console.log(res);
          if (res.authResponse) {
            FB.api('/me', function(response){
              var fb_uid, fb_name, fb_email, data;
              console.log(response);
              fb_uid = response.id;
              fb_name = response.name;
              fb_email = response.email;
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
  }));
  app.controller('updateCtrl', ['$scope', '$location', '$http', '$rootScope'].concat(function($scope, $location, $http, $rootScope){
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
  app.directive('cheatCode', cheatcodeDirective);
}).call(this);
