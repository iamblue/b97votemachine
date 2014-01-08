(function(){
  app.controller('indexCtrl', ['$scope'].concat(function($scope){
    var ref$;
    $scope.n = [
      {
        name: 1,
        num: 0,
        content: ['']
      }, {
        name: 2,
        num: 0,
        content: ['']
      }, {
        name: 3,
        num: 0,
        content: ['']
      }, {
        name: 4,
        num: 0,
        content: ['']
      }, {
        name: 5,
        num: 0,
        content: ['']
      }, {
        name: 6,
        num: 0,
        content: ['']
      }, {
        name: 7,
        num: 0,
        content: []
      }, {
        name: 8,
        num: 0,
        content: ['']
      }, {
        name: (ref$ = {
          name: 9,
          num: 0,
          content: ['']
        })[10],
        num: ref$[0],
        content: [ref$['']]
      }
    ];
    $scope.phone = '';
    $scope.win = function(){
      var oo, win;
      oo = '';
      win = '';
      angular.forEach($scope.n, function(v, i, l){
        var oo, win;
        console.log(v);
        if (oo === '') {
          return oo = v.num;
        } else if (oo !== '') {
          if (v.num >= oo) {
            oo = v.num;
            return win = v.name;
          }
        }
      });
      if (win === '') {
        return alert('贏家是' + $scope.n[0].name);
      } else {
        console.log(win);
        return alert('贏家是' + win);
      }
    };
    $scope.vote = function(name){
      if ($scope.phone === '') {
        return alert('請輸入電話號碼');
      } else {
        $scope.n[name].content.push($scope.phone);
        $scope.n[name].num = Number($scope.n[name].num) + 1;
        return $scope.phone = '';
      }
    };
    $scope.name = function(){
      return prompt('您是？');
    };
  }));
}).call(this);
