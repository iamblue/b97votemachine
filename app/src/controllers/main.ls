app.controller 'indexCtrl' <[$scope]> ++ ($scope) !->
  $scope.n =[
    {
      name:1
      num:0
      content:['']
    }
    {
      name:2
      num:0
      content:['']
    }
    {
      name:3
      num:0
      content:['']
    }
    {
      name:4
      num:0
      content:['']
    }
    {
      name:5
      num:0
      content:['']
    }
    {
      name:6
      num:0
      content:['']
    }
    {
      name:7
      num:0
      content:[]
    }
    {
      name:8
      num:0
      content:['']
    }
    {
      name:9
      num:0
      content:['']
    }{
      name:10
      num:0
      content:['']
    }
  ]
  $scope.phone = ''
  $scope.win = ->
    oo = ''
    win = ''
    angular.forEach($scope.n , (v,i,l)->
      console.log(v)
      if oo == ''
        oo = v.num
      else if oo != ''
        if(v.num >= oo)
           oo = v.num
           win = v.name
    )
    if(win == '')
      alert('贏家是'+$scope.n[0].name)
    else
      console.log(win)
      alert('贏家是'+win)
  $scope.vote = (name) ->
    if $scope.phone == ''
      alert('請輸入電話號碼') 
    else
      $scope.n[name].content.push($scope.phone)
      $scope.n[name].num = Number($scope.n[name].num) + 1 
      $scope.phone = ''
  $scope.name = ->
    prompt('您是？')
      