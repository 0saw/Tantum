(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js":[function(require,module,exports){
$(function() {
  var enableParallax = null;
  var helperItems = [];

  $('.literature').on('click', function (e) {
    $('.footer__legal .footer__cont').show();
  });
  $('.readMoreFooter').on('click', function (e) {
    e.preventDefault();
    $('.footer__legal .footer__cont').slideToggle();
  });

  $('.pdSlide').each(function (e) {
    helperItems.push({
      elem: this,
      toggled: false,
      text: $(this).find('.pdSlide__info'),
    });
  }).on('click', function (e) {
    $this = $(this);
    var item = $.grep(helperItems, function (elem) {
      return elem.elem == $this[0];
    });
    if (typeof item[0] != 'undefined') {
      item[0].toggled = true;
      item[0].text.slideToggle();
    }
  });

  function toggleHelpers(show, anim) {
    if (typeof anim === 'undefined') {
      anim = true;
    }
    $.each(helperItems, function (index, elem) {
      if (show) {
        elem.text.slideDown();
      } else {
        elem.text.slideUp();
      }
    });
  };
  if (($(window).height() < 750) || ($(window).width() <= 960)) {
    $.each(helperItems, function (index, elem) {
      elem.text.hide();
    });
  } else {
    $.each(helperItems, function (index, elem) {
      elem.text.show();
    });
  }

  var windowResize = function () {
    var newParallax = $(window).width() > 960;
    if (newParallax != enableParallax) {
      enableParallax = newParallax;
      if (enableParallax) {
        toggleHelpers(true);
      } else {
        toggleHelpers(false);
      }
    }
  };
  $(window).on('resize', windowResize);

  var page = $(document.body).hasClass('front');
  page = page ? 'front' : '';
  switch (page) {
    case 'front':
      var frontPage = require('./views/front-page');
      break;
    default:
      break;
  }
});

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
var imagesSelector = [
  ".girls img",
  ".welcome__logo img",
  ".girls__h-bg_right",
  "#flora",
].join(', ');

var scrollToElements = [
  { sel: "a[href='#f0']", offset: 50 },
  { sel: "a[href='#f1']", offset: 100 },
  { sel: "a[href='#f2']", offset: 60 },
  { sel: "a[href='#f3']", offset: 100 },
  { sel: "a[href='#f4']", offset: 100 },
  { sel: "a[href='#f5']", offset: 100 },
  { sel: "a[href='#f6']", offset: 100 },
  { sel: "a[href='#f7']", offset: 100 },
  { sel: "a[href='#f8']", offset: 100 },
  { sel: "a[href='#footer']", offset: 100 }
];



$(imagesSelector).imagesLoaded({ background: true })
  .done(function(instance) {
  })
  .fail(function() {
    alert("Не все изображения удалось загрузить. Веб-страница может выглядеть искаженной.");
  })
  .always(function() {
    $(document.body).addClass('imagesLoaded');
    $('#preloader').fadeOut({
      duration: 400,
      easing: 'easeInOutSine'
    });
    frontPage();
    scrollTos();
  });

var scrollTos = function () {
  var scrollToElement = function (element, offset) {
    $(element).click(function(e) {
      e.preventDefault();

      var elementClick = $(this).attr("href");
      var destination  = $(elementClick)[0].offsetTop;
      if(destination < 0) { destination = 0; }
      $('html, body').animate({ scrollTop: destination - offset }, "slow");
    });
  };

  for (var i = 0; i < scrollToElements.length; i++) {
    scrollToElement(scrollToElements[i].sel, scrollToElements[i].offset);
  }
};

var frontPage = function() {
  var handle = document.getElementById('welcomeHandle');
  var girl = document.getElementById('girlAfter');
  var girlsContainer = document.getElementById('girlsContainer');
  var $handle = $(handle);
  var $clock = $(".clock");
  var mc = new Hammer(handle);
  var enableParallax = null;
  var girlsInfo = {
    x: 0
  };

  var windowResize = function () {
    girlsInfo.width = girlsContainer.offsetWidth;
    girlsInfo.x = 0;
    var newParallax = $(window).width() > 1024;
    if (newParallax != enableParallax) {
      enableParallax = newParallax;
      if (enableParallax) {
        parallax1.enable();
      } else {
        parallax1.disable();
        parallax1.updateLayers();
      }
    }
    requestAnimationFrame(pan);
  };
  $(window).on('resize', windowResize);

  mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

  mc.on("panmove", function(e) {
    girlsInfo.x = Math.max(Math.min(girlsInfo.xOrig + e.deltaX, girlsInfo.width / 2), -girlsInfo.width / 2);
    requestAnimationFrame(pan);
  }).on('panstart', function() {
    girlsInfo.xOrig = girlsInfo.x;
    $(document.body).addClass('panning');
  }).on('panend', function() {
    $(document.body).removeClass('panning');
    // girlsInfo.x = 0;
    // requestAnimationFrame(pan);

    // $({animVal: girlsInfo.x}).animate({animVal: 0}, {
    //   duration: 600,
    //   easing: 'easeInOutSine',
    //   step: function () {
    //     girlsInfo.x = this.animVal;
    //     requestAnimationFrame(pan);
    //   },
    //   complete: function() {
    //     $(document.body).removeClass('animating');
    //   }
    // });
  });

  var pan = function () {
    // $handle.css('transform', 'translate3d(' + girlsInfo.x + 'px, 0, 0) rotate3d(0, 1, 0, ' + 15 * Math.sin(girlsInfo.x / girlsInfo.width) + 'deg)');
    $handle.css('transform', 'translate3d(' + girlsInfo.x + 'px, 0, 0)');
    girl.style.left = girlsInfo.width / 2 + girlsInfo.x + 'px';
  };

  var scene1 = document.getElementById('signsScene');
  var parallax1 = new Parallax(scene1, {
    calibrateX: true,
    calibrateY: true,
    invertX: false,
    invertY: false,
    limitX: false,
    limitY: false,
    scalarX: 2,
    scalarY: 2,
    frictionX: 0.3,
    frictionY: 0.5,
    originX: 0.5,
    originY: 0.5
  });

  var knob = {
    min: 0,
    max: 20,
    value: 20,
    width: 280,
    height: 280,
    PI2: Math.PI / 2,
    elem: null,
    ctx: null,
    init: function() {
      knob.elem = document.getElementById('problemsClock');
      knob.ctx = knob.elem.getContext('2d');
      knob.draw();
    },
    draw: function() {
      if (knob.floraPattern == null) {
        var floraImg = document.getElementById('flora');
        knob.floraPattern = knob.ctx.createPattern(floraImg, "repeat");
      }
      knob.ctx.clearRect(0, 0, knob.width, knob.height);
      knob.ctx.fillStyle = knob.floraPattern;
      knob.ctx.beginPath();
      knob.ctx.moveTo(knob.width / 2, knob.width / 2);
      knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, -knob.PI2, -knob.PI2 + (knob.PI2 + knob.PI2 / 3) * (1 - knob.value / knob.max), false);
      knob.ctx.closePath();
      knob.ctx.fill();
    }
  };
  knob.init();

  $header = $('.header');
  document.addEventListener('scroll', function () {
    $header.toggleClass('fixed', $(this).scrollTop() > 10);

    var $myElem = $('#problems');
    if((($(this).scrollTop()) >= $myElem.offset().top) && (!$myElem.hasClass('animating'))) {
      $myElem.addClass('animating');
      $({animatedVal: knob.max}).animate({animatedVal: knob.min}, {
        duration: 3000,
        easing: "easeInOutSine",
        step: function() { 
          knob.value = this.animatedVal;
          requestAnimationFrame(knob.draw);
        },
        complete: function() {
          knob.value = this.animatedVal;
          requestAnimationFrame(knob.draw);
        }
      });
      setTimeout(function() {
        $myElem.removeClass('animating');
      }, 5000);
    }
  });

  windowResize();
}

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcbiAgdmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbiAgdmFyIGhlbHBlckl0ZW1zID0gW107XG5cbiAgJCgnLmxpdGVyYXR1cmUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICQoJy5mb290ZXJfX2xlZ2FsIC5mb290ZXJfX2NvbnQnKS5zaG93KCk7XG4gIH0pO1xuICAkKCcucmVhZE1vcmVGb290ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuZm9vdGVyX19sZWdhbCAuZm9vdGVyX19jb250Jykuc2xpZGVUb2dnbGUoKTtcbiAgfSk7XG5cbiAgJCgnLnBkU2xpZGUnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgaGVscGVySXRlbXMucHVzaCh7XG4gICAgICBlbGVtOiB0aGlzLFxuICAgICAgdG9nZ2xlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAkKHRoaXMpLmZpbmQoJy5wZFNsaWRlX19pbmZvJyksXG4gICAgfSk7XG4gIH0pLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBpdGVtID0gJC5ncmVwKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0uZWxlbSA9PSAkdGhpc1swXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGl0ZW1bMF0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGl0ZW1bMF0udG9nZ2xlZCA9IHRydWU7XG4gICAgICBpdGVtWzBdLnRleHQuc2xpZGVUb2dnbGUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZUhlbHBlcnMoc2hvdywgYW5pbSkge1xuICAgIGlmICh0eXBlb2YgYW5pbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGFuaW0gPSB0cnVlO1xuICAgIH1cbiAgICAkLmVhY2goaGVscGVySXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbSkge1xuICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgZWxlbS50ZXh0LnNsaWRlRG93bigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS50ZXh0LnNsaWRlVXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgaWYgKCgkKHdpbmRvdykuaGVpZ2h0KCkgPCA3NTApIHx8ICgkKHdpbmRvdykud2lkdGgoKSA8PSA5NjApKSB7XG4gICAgJC5lYWNoKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgIGVsZW0udGV4dC5oaWRlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJC5lYWNoKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgIGVsZW0udGV4dC5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdQYXJhbGxheCA9ICQod2luZG93KS53aWR0aCgpID4gOTYwO1xuICAgIGlmIChuZXdQYXJhbGxheCAhPSBlbmFibGVQYXJhbGxheCkge1xuICAgICAgZW5hYmxlUGFyYWxsYXggPSBuZXdQYXJhbGxheDtcbiAgICAgIGlmIChlbmFibGVQYXJhbGxheCkge1xuICAgICAgICB0b2dnbGVIZWxwZXJzKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlSGVscGVycyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbiAgdmFyIHBhZ2UgPSAkKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdmcm9udCcpO1xuICBwYWdlID0gcGFnZSA/ICdmcm9udCcgOiAnJztcbiAgc3dpdGNoIChwYWdlKSB7XG4gICAgY2FzZSAnZnJvbnQnOlxuICAgICAgdmFyIGZyb250UGFnZSA9IHJlcXVpcmUoJy4vdmlld3MvZnJvbnQtcGFnZScpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcbiIsInZhciBpbWFnZXNTZWxlY3RvciA9IFtcbiAgXCIuZ2lybHMgaW1nXCIsXG4gIFwiLndlbGNvbWVfX2xvZ28gaW1nXCIsXG4gIFwiLmdpcmxzX19oLWJnX3JpZ2h0XCIsXG4gIFwiI2Zsb3JhXCIsXG5dLmpvaW4oJywgJyk7XG5cbnZhciBzY3JvbGxUb0VsZW1lbnRzID0gW1xuICB7IHNlbDogXCJhW2hyZWY9JyNmMCddXCIsIG9mZnNldDogNTAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjEnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMiddXCIsIG9mZnNldDogNjAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjMnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y1J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjYnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNyddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y4J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZm9vdGVyJ11cIiwgb2Zmc2V0OiAxMDAgfVxuXTtcblxuXG5cbiQoaW1hZ2VzU2VsZWN0b3IpLmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSlcbiAgLmRvbmUoZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgfSlcbiAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgYWxlcnQoXCLQndC1INCy0YHQtSDQuNC30L7QsdGA0LDQttC10L3QuNGPINGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjC4g0JLQtdCxLdGB0YLRgNCw0L3QuNGG0LAg0LzQvtC20LXRgiDQstGL0LPQu9GP0LTQtdGC0Ywg0LjRgdC60LDQttC10L3QvdC+0LkuXCIpO1xuICB9KVxuICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ2ltYWdlc0xvYWRlZCcpO1xuICAgICQoJyNwcmVsb2FkZXInKS5mYWRlT3V0KHtcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJ1xuICAgIH0pO1xuICAgIGZyb250UGFnZSgpO1xuICAgIHNjcm9sbFRvcygpO1xuICB9KTtcblxudmFyIHNjcm9sbFRvcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvZmZzZXQpIHtcbiAgICAkKGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG4gICAgICB2YXIgZGVzdGluYXRpb24gID0gJChlbGVtZW50Q2xpY2spWzBdLm9mZnNldFRvcDtcbiAgICAgIGlmKGRlc3RpbmF0aW9uIDwgMCkgeyBkZXN0aW5hdGlvbiA9IDA7IH1cbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIG9mZnNldCB9LCBcInNsb3dcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JvbGxUb0VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgc2Nyb2xsVG9FbGVtZW50KHNjcm9sbFRvRWxlbWVudHNbaV0uc2VsLCBzY3JvbGxUb0VsZW1lbnRzW2ldLm9mZnNldCk7XG4gIH1cbn07XG5cbnZhciBmcm9udFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG4gIHZhciBnaXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxBZnRlcicpO1xuICB2YXIgZ2lybHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybHNDb250YWluZXInKTtcbiAgdmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG4gIHZhciAkY2xvY2sgPSAkKFwiLmNsb2NrXCIpO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKGhhbmRsZSk7XG4gIHZhciBlbmFibGVQYXJhbGxheCA9IG51bGw7XG4gIHZhciBnaXJsc0luZm8gPSB7XG4gICAgeDogMFxuICB9O1xuXG4gIHZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ2lybHNJbmZvLndpZHRoID0gZ2lybHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgZ2lybHNJbmZvLnggPSAwO1xuICAgIHZhciBuZXdQYXJhbGxheCA9ICQod2luZG93KS53aWR0aCgpID4gMTAyNDtcbiAgICBpZiAobmV3UGFyYWxsYXggIT0gZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIGVuYWJsZVBhcmFsbGF4ID0gbmV3UGFyYWxsYXg7XG4gICAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgICAgcGFyYWxsYXgxLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYWxsYXgxLmRpc2FibGUoKTtcbiAgICAgICAgcGFyYWxsYXgxLnVwZGF0ZUxheWVycygpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfTtcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuXG4gIG1jLmdldCgncGFuJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwgfSk7XG5cbiAgbWMub24oXCJwYW5tb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBnaXJsc0luZm8ueCA9IE1hdGgubWF4KE1hdGgubWluKGdpcmxzSW5mby54T3JpZyArIGUuZGVsdGFYLCBnaXJsc0luZm8ud2lkdGggLyAyKSwgLWdpcmxzSW5mby53aWR0aCAvIDIpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICB9KS5vbigncGFuc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICBnaXJsc0luZm8ueE9yaWcgPSBnaXJsc0luZm8ueDtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdwYW5uaW5nJyk7XG4gIH0pLm9uKCdwYW5lbmQnLCBmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKCdwYW5uaW5nJyk7XG4gICAgLy8gZ2lybHNJbmZvLnggPSAwO1xuICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuXG4gICAgLy8gJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgIC8vICAgZHVyYXRpb246IDYwMCxcbiAgICAvLyAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnLFxuICAgIC8vICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAvLyAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgLy8gICB9LFxuICAgIC8vICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfSk7XG5cbiAgdmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCknKTtcbiAgICBnaXJsLnN0eWxlLmxlZnQgPSBnaXJsc0luZm8ud2lkdGggLyAyICsgZ2lybHNJbmZvLnggKyAncHgnO1xuICB9O1xuXG4gIHZhciBzY2VuZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnNTY2VuZScpO1xuICB2YXIgcGFyYWxsYXgxID0gbmV3IFBhcmFsbGF4KHNjZW5lMSwge1xuICAgIGNhbGlicmF0ZVg6IHRydWUsXG4gICAgY2FsaWJyYXRlWTogdHJ1ZSxcbiAgICBpbnZlcnRYOiBmYWxzZSxcbiAgICBpbnZlcnRZOiBmYWxzZSxcbiAgICBsaW1pdFg6IGZhbHNlLFxuICAgIGxpbWl0WTogZmFsc2UsXG4gICAgc2NhbGFyWDogMixcbiAgICBzY2FsYXJZOiAyLFxuICAgIGZyaWN0aW9uWDogMC4zLFxuICAgIGZyaWN0aW9uWTogMC41LFxuICAgIG9yaWdpblg6IDAuNSxcbiAgICBvcmlnaW5ZOiAwLjVcbiAgfSk7XG5cbiAgdmFyIGtub2IgPSB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMjAsXG4gICAgdmFsdWU6IDIwLFxuICAgIHdpZHRoOiAyODAsXG4gICAgaGVpZ2h0OiAyODAsXG4gICAgUEkyOiBNYXRoLlBJIC8gMixcbiAgICBlbGVtOiBudWxsLFxuICAgIGN0eDogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGtub2IuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtc0Nsb2NrJyk7XG4gICAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAga25vYi5kcmF3KCk7XG4gICAgfSxcbiAgICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChrbm9iLmZsb3JhUGF0dGVybiA9PSBudWxsKSB7XG4gICAgICAgIHZhciBmbG9yYUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9yYScpO1xuICAgICAgICBrbm9iLmZsb3JhUGF0dGVybiA9IGtub2IuY3R4LmNyZWF0ZVBhdHRlcm4oZmxvcmFJbWcsIFwicmVwZWF0XCIpO1xuICAgICAgfVxuICAgICAga25vYi5jdHguY2xlYXJSZWN0KDAsIDAsIGtub2Iud2lkdGgsIGtub2IuaGVpZ2h0KTtcbiAgICAgIGtub2IuY3R4LmZpbGxTdHlsZSA9IGtub2IuZmxvcmFQYXR0ZXJuO1xuICAgICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBrbm9iLmN0eC5tb3ZlVG8oa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyKTtcbiAgICAgIGtub2IuY3R4LmFyYyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCAta25vYi5QSTIsIC1rbm9iLlBJMiArIChrbm9iLlBJMiArIGtub2IuUEkyIC8gMykgKiAoMSAtIGtub2IudmFsdWUgLyBrbm9iLm1heCksIGZhbHNlKTtcbiAgICAgIGtub2IuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAga25vYi5jdHguZmlsbCgpO1xuICAgIH1cbiAgfTtcbiAga25vYi5pbml0KCk7XG5cbiAgJGhlYWRlciA9ICQoJy5oZWFkZXInKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICRoZWFkZXIudG9nZ2xlQ2xhc3MoJ2ZpeGVkJywgJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEwKTtcblxuICAgIHZhciAkbXlFbGVtID0gJCgnI3Byb2JsZW1zJyk7XG4gICAgaWYoKCgkKHRoaXMpLnNjcm9sbFRvcCgpKSA+PSAkbXlFbGVtLm9mZnNldCgpLnRvcCkgJiYgKCEkbXlFbGVtLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkpIHtcbiAgICAgICRteUVsZW0uYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgJCh7YW5pbWF0ZWRWYWw6IGtub2IubWF4fSkuYW5pbWF0ZSh7YW5pbWF0ZWRWYWw6IGtub2IubWlufSwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFNpbmVcIixcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oKSB7IFxuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJG15RWxlbS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICB9LCA1MDAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvd1Jlc2l6ZSgpO1xufVxuIl19
