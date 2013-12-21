page = window.page = sections.create()
page.section 1, (section) !->
	target = document.querySelector('#section-2-opacity')
	bg-pattern = document.querySelector('.bg-pattern')

	section.transitions [
		key: 'margin-left'
		start: 0 #螢幕最下0 #物件頂點道螢幕最上100 #物件底部超過點到螢幕最上200 
		end: 100
		from: 0  #
		to: 200
		format: '%spx' #'%spx'
		target: target
		prefix: true
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
