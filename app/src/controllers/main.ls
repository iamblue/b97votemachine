const cheatcodeDirective = ->
	restrict: 'A'
	link: !(scope,elem,attr) ->
		elem.bind('keydown',(e)->
			switch(e.which)
			case 38 then
				scope.$apply(->
					scope.cCode.push(38)
				)
			case 40
				scope.$apply(->
					scope.cCode.push(40)
				)
			case 37
				scope.$apply(->
					scope.cCode.push(37)
				)
			case 39
				scope.$apply(->
					scope.cCode.push(39)
				)
			case 66 then
				scope.$apply(->
					scope.cCode.push(66)
				)
			case 65 then
				scope.$apply(->
					scope.cCode.push(65)
				)
				if scope.cCode[0] == 38 && scope.cCode[1] == 38 && scope.cCode[2] == 40 && scope.cCode[3] == 40 && scope.cCode[4] == 37 && scope.cCode[5] == 39 && scope.cCode[6] == 37 && scope.cCode[7] == 39 && scope.cCode[8] == 66 && scope.cCode[9] == 65
					scope.passCheatCode()
				else
					scope.cCode.length = 0
			default
				scope.$apply(->
					scope.cCode.length = 0
				)
		)

app.controller 'indexCtrl', <[$scope $location $rootScope $localStorage $http idata $sce]> ++ ($scope, $location, $rootScope, $localStorage, $http, idata, $sce) !->
		$scope.idata = idata.data.data
		$scope.urldata = []
		$rootScope.snumber = []
		$rootScope.number = []
		angular.forEach(idata.data.data,(v,i,o)->
			$rootScope.number.push v.number
			_tmp = v.number.split ''
			_tmp[2] = '_'
			_tmp[3] = '_'
			_s = _tmp.join().replace /\,/g,''
			$rootScope.snumber.push _s
			$scope.urldata.push '//www.youtube.com/embed/'+v.urlid
		)

		$scope.urldata[0] = $sce.trustAsResourceUrl $scope.urldata[0]
		$scope.urldata[1] = $sce.trustAsResourceUrl $scope.urldata[1]
		$scope.urldata[2] = $sce.trustAsResourceUrl $scope.urldata[2]

		$scope.urldata.push idata.data.data.urlid 
		page.init()
		$http.defaults.useXDomain = true

		$scope.cCode = []

		$scope.update = ->
			console.log \123
			if ($rootScope.fbid)
				$location.path('/update')
			else
				FB.login((res) ->
					console.log(res)
					if(res.authResponse)
						FB.api('/me'
							(response) !->
								console.log(response)
								fb_uid = response.id
								fb_name = response.name
								fb_email = response.email

								$rootScope.$apply( !->
									$localStorage.name = response.name
									$rootScope.name = response.name
									$rootScope.login = true
									$rootScope.first_name = response.first_name
									$rootScope.last_name = response.last_name
								)
								$location.path('/')
								const data = {
									fb_name:response.name
									thirdId:fb_uid
									email:fb_email
									thirdparty_type:'fb'
								}
								$http.post('http://api.dont-throw.com/member/add',data)
							scope : 'email,publish_actions'
						)
					false
				)

app.controller 'updateCtrl', <[$scope $location $http $rootScope]> ++ ($scope, $location, $http, $rootScope) !->
		$http.defaults.useXDomain = true
		$scope.send= ->
			const data = {
				id: $rootScope.fbid
				tk: $rootScope.tk
				urlid: $scope.url
				number: $scope.number
				city: $scope.city
				location: $scope.location
				description: $scope.description
				fbid:$rootScope.fbid
			}
			$http.post('http://api.dont-throw.com/data/add',data)

app.directive 'cheatCode' cheatcodeDirective
