(function(){
  var page;
  page = window.page = sections.create();
  page.section(0, function(section){
    var background, reportBtn, title, content;
    background = document.querySelector('.section--search__background');
    reportBtn = document.querySelector('.section--search__report-btn');
    title = document.querySelector('.section--search__title');
    content = document.querySelector('.section--search__container');
    section.transitions([
      {
        key: 'transform',
        start: 100,
        end: 200,
        from: 0,
        to: 300,
        format: 'translate3d(0, %spx, 0)',
        target: background,
        prefix: true
      }, {
        key: 'opacity',
        start: 100,
        end: 200,
        from: 0.6,
        to: 0.2,
        format: '%s',
        target: background
      }, {
        key: 'transform',
        start: 100,
        end: 150,
        from: 1,
        to: 1.2,
        format: 'scale(%s)',
        target: reportBtn,
        prefix: true
      }, {
        key: 'opacity',
        start: 100,
        end: 150,
        from: 0.8,
        to: 1,
        format: '%s',
        target: reportBtn
      }, {
        key: 'text-shadow',
        start: 100,
        end: 200,
        values: [
          {
            from: 1,
            to: 8
          }, {
            from: 1,
            to: 5
          }, {
            from: 1,
            to: 8
          }, {
            from: 1,
            to: 5
          }
        ],
        format: '%spx 0 %spx #40E0D0, -%spx 0 %spx #CD5C5C',
        target: title
      }, {
        key: 'transform',
        start: 100,
        end: 200,
        from: -150,
        to: 100,
        format: 'translate3d(-300px, %spx, 0)',
        target: content,
        prefix: true
      }
    ]);
  });
  page.section(1, function(section){
    var leftOne, rightOne, middleOne;
    leftOne = document.querySelector('.section--video-list__item--left');
    rightOne = document.querySelector('.section--video-list__item--right');
    middleOne = document.querySelector('.section--video-list__item--middle');
    section.transitions([
      {
        key: 'opacity',
        start: 0,
        end: 100,
        from: 0,
        to: 1,
        format: '%s',
        target: leftOne
      }, {
        key: 'transform',
        start: 0,
        end: 100,
        from: -200,
        to: 0,
        format: 'translate3d(%spx, 0, 0)',
        target: leftOne,
        prefix: true
      }, {
        key: 'opacity',
        start: 0,
        end: 100,
        from: 0,
        to: 1,
        format: '%s',
        target: rightOne
      }, {
        key: 'transform',
        start: 0,
        end: 100,
        from: 200,
        to: 0,
        format: 'translate3d(%spx, 0, 0)',
        target: rightOne,
        prefix: true
      }, {
        key: 'opacity',
        start: 0,
        end: 100,
        from: 0,
        to: 1,
        format: '%s',
        target: middleOne
      }
    ]);
  });
  page.section(2, function(section){
    var background, message;
    background = document.querySelector('.section--description__background');
    message = document.querySelector('.section--description__message');
    section.transitions([
      {
        key: 'transform',
        start: 0,
        end: 100,
        from: -100,
        to: 50,
        format: 'translate3d(0, %spx, 0)',
        target: background,
        prefix: true
      }, {
        key: 'opacity',
        start: 0,
        end: 100,
        from: 0.2,
        to: 0.6,
        format: '%s',
        target: background
      }, {
        key: 'transform',
        start: 0,
        end: 100,
        from: -100,
        to: 50,
        format: 'translate3d(0, %spx, 0)',
        target: message,
        prefix: true
      }
    ]);
  });
}).call(this);
