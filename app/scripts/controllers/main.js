(function(){
  var cheatcodeDirective;
  cheatcodeDirective = function(){
    return {
      restrict: 'A',
      link: function(scope, elem, attr){
        elem.bind('keydown', function(e){
          switch (e.which) {
          case 38:
            return scope.$apply(function(){
              return scope.cCode.push(38);
            });
          case 40:
            return scope.$apply(function(){
              return scope.cCode.push(40);
            });
          case 37:
            return scope.$apply(function(){
              return scope.cCode.push(37);
            });
          case 39:
            return scope.$apply(function(){
              return scope.cCode.push(39);
            });
          case 66:
            return scope.$apply(function(){
              return scope.cCode.push(66);
            });
          case 65:
            scope.$apply(function(){
              return scope.cCode.push(65);
            });
            if (scope.cCode[0] === 38 && scope.cCode[1] === 38 && scope.cCode[2] === 40 && scope.cCode[3] === 40 && scope.cCode[4] === 37 && scope.cCode[5] === 39 && scope.cCode[6] === 37 && scope.cCode[7] === 39 && scope.cCode[8] === 66 && scope.cCode[9] === 65) {
              return scope.passCheatCode();
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
  app.controller('indexCtrl', ['$scope', '$location', '$rootScope', '$localStorage', '$http', 'idata', '$sce'].concat(function($scope, $location, $rootScope, $localStorage, $http, idata, $sce){
    $http.defaults.useXDomain = true;
    $scope.scale = ['section--video-list__item--left', 'section--video-list__item--middle', 'section--video-list__item--right'];
    $scope.idata = idata.data.data;
    $scope.urldata = [];
    $rootScope.snumber = [];
    $rootScope.number = [];
    angular.forEach(idata.data.data, function(v, i, o){
      var _tmp, _s;
      $rootScope.number.push(v.number);
      _tmp = v.number.split('');
      _tmp[2] = '_';
      _tmp[3] = '_';
      _s = _tmp.join().replace(/\,/g, '');
      $rootScope.snumber.push(_s);
      return $scope.urldata.push('//www.youtube.com/embed/' + v.urlid);
    });
    $scope.urldata[0] = $sce.trustAsResourceUrl($scope.urldata[0]);
    $scope.urldata[1] = $sce.trustAsResourceUrl($scope.urldata[1]);
    $scope.urldata[2] = $sce.trustAsResourceUrl($scope.urldata[2]);
    $scope.urldata.push(idata.data.data.urlid);
    page.init();
    $http.defaults.useXDomain = true;
    $scope.cCode = [];
    $scope.search = function(){
      $scope.resultdata = [];
      $scope.clicksearch = true;
      return $http({
        method: 'GET',
        url: 'http://api.dont-throw.com/data/search?number=' + $scope.carnumber
      }).success(function(d){
        $scope.resaultnum = d.data.length;
        $scope.result = d.data;
        if (d.data.length !== 0) {
          $scope.noresult = false;
          $scope.resultdata[0] = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + d.data.urlid);
        } else {
          $scope.noresult = true;
        }
      });
    };
    $scope.update = function(){
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
              $http.post('http://api.dont-throw.com/member/add', data);
            }, {
              scope: 'email,publish_actions'
            });
          }
          return false;
        });
      }
    };
  }));
  app.controller('updateCtrl', ['$scope', '$location', '$http', '$rootScope', '$sce'].concat(function($scope, $location, $http, $rootScope, $sce){
    $http.defaults.useXDomain = true;
    $scope.nlist = [];
    $scope.addnum = function(){
      if ($scope.nlist.length === 0) {
        $scope.nlist.push($scope.inputnum);
        $scope.wantaddnumber = false;
        $scope.fullnum = true;
      }
    };
    $scope.send = function(){
      var data;
      if ($scope.nlist.length !== 0 && $scope.location && $scope.description && $scope.city && $scope.url) {
        data = {
          id: $rootScope.fbid,
          tk: $rootScope.tk,
          urlid: $scope.url,
          number: $scope.nlist[0],
          city: $scope.city,
          location: $scope.location,
          description: $scope.description,
          fbid: $rootScope.fbid
        };
        return $http.post('http://api.dont-throw.com/data/add', data).success(function(v){
          if (v.res === 'success') {
            alert('感謝您，已貼文成功！');
            return $location.path('/');
          } else {
            return alert('Oops! 再試一次');
          }
        });
      }
    };
    $scope.addnewbtn = function(){
      return $scope.wantaddnumber = !$scope.wantaddnumber;
    };
    $scope.checkurl = function(){
      var url, _tmp;
      url = $scope.url;
      url = url.replace('https://www.youtube.com/watch?v=', '');
      url = url.replace('http://www.youtube.com/watch?v=', '');
      _tmp = url.split('&');
      console.log(_tmp);
      $scope.url = _tmp[0];
      $scope.change = true;
      return $scope.urldata = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + _tmp[0]);
    };
    $scope.gosearchid = function(){
      $http({
        method: 'GET',
        url: 'http://api.dont-throw.com/data/youtube?id=' + $scope.url
      }).success(function(d){
        if (d.res === 'success') {
          $scope.description = d.data.description;
        }
      });
      return console.log('123');
    };
  }));
  app.directive('cheatCode', cheatcodeDirective);
}).call(this);
