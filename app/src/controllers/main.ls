const cheatcodeDirective = ->
	restrict: 'A'
	link: !(scope,elem,attr) ->
		console.log scope
		console.log \123
		console.log(elem)
		elem.bind('keypress',(e)->
			switch(e.which)
			case 98 then
				scope.$apply(->
					scope.cCode.push(98)
				)
			case 97 then
				scope.$apply(->
					scope.cCode.push(97)
				)
				if scope.cCode.length == 2 && scope.cCode[0] == 98
					console.log \hihi
					alert('boombbbbbb')
				else
					scope.cCode.length = 0
			default
				scope.$apply(->
					scope.cCode.length = 0
				)
		)

app.controller 'indexCtrl', <[$scope $location $rootScope $localStorage $http idata]> ++ ($scope, $location, $rootScope, $localStorage, $http, idata) !->
		$scope.idata = idata.data.data
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
