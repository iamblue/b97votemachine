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
			event.preventDefault()
		)

angular.module 'BadDriverApp'
	.controller 'indexCtrl', <[$scope $location $rootScope $localStorage $http]> ++ ($scope,$location,$rootScope,$localStorage,$http) !->
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
								$http.post('http://127.0.0.1:3000/member/add',data)
							scope : 'email,publish_actions'
						)
					false
				)
	.controller 'updateCtrl', <[$scope $location $http $rootScope]> ++ ($scope,$location,$http,$rootScope) !->
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
			$http.post('http://127.0.0.1:3000/data/add',data)
	.directive 'cheatCode' cheatcodeDirective

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
  

