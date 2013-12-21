(function(){
  var page;
  page = window.page = sections.create();
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
