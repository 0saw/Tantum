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

  $('.filter input[type="radio"], .filter select').styler();

  var page = $(document.body).hasClass('front');
  page = page ? 'front' : '';
  page = ($('.header__logo').length > 0) ? 'inner' : page;
  switch (page) {
    case 'front':
      var frontPage = require('./views/front-page');
      break;
    case 'inner':
      var innerPage = require('./views/inner-page');
      break;
    default:
      break;
  }
  console.log(page);
});

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js","./views/inner-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\inner-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
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
  var scrollFun = function () {
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
  };
  document.addEventListener('scroll', scrollFun);
  $(document).ready(scrollFun);

  windowResize();
}

},{}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\inner-page.js":[function(require,module,exports){
(function () {
  var $header = $('.header');
  var $logo = $header.find('.header__logo');
  var height = $logo.outerHeight();
  var isFixed = false;

  var scrollFun = function () {
    var scrollTop = $(window).scrollTop();

    if ((isFixed && (scrollTop > height)) || (!isFixed && (scrollTop <= height))) {
      return;
    }

    if (scrollTop > height) {
      $header.css('transform', "translate3d(0, -" + $logo.outerHeight() + "px, 0)");
      $('header').addClass('fixed');
      isFixed = true;
    } else {
      $header.css('transform', "none");
      $('header').removeClass('fixed');
      isFixed = false;
    }
  }

  $(window).on('scroll', scrollFun);
  $(window).on('resize', function () {
    height = $logo.outerHeight();
    scrollFun();
  });
  $(document).ready(scrollFun);

})();

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyIsInNyYy9zY3JpcHRzL3ZpZXdzL2lubmVyLXBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcbiAgdmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbiAgdmFyIGhlbHBlckl0ZW1zID0gW107XG5cbiAgJCgnLmxpdGVyYXR1cmUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICQoJy5mb290ZXJfX2xlZ2FsIC5mb290ZXJfX2NvbnQnKS5zaG93KCk7XG4gIH0pO1xuICAkKCcucmVhZE1vcmVGb290ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuZm9vdGVyX19sZWdhbCAuZm9vdGVyX19jb250Jykuc2xpZGVUb2dnbGUoKTtcbiAgfSk7XG5cbiAgJCgnLnBkU2xpZGUnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgaGVscGVySXRlbXMucHVzaCh7XG4gICAgICBlbGVtOiB0aGlzLFxuICAgICAgdG9nZ2xlZDogZmFsc2UsXG4gICAgICB0ZXh0OiAkKHRoaXMpLmZpbmQoJy5wZFNsaWRlX19pbmZvJyksXG4gICAgfSk7XG4gIH0pLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBpdGVtID0gJC5ncmVwKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0uZWxlbSA9PSAkdGhpc1swXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGl0ZW1bMF0gIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGl0ZW1bMF0udG9nZ2xlZCA9IHRydWU7XG4gICAgICBpdGVtWzBdLnRleHQuc2xpZGVUb2dnbGUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZUhlbHBlcnMoc2hvdywgYW5pbSkge1xuICAgIGlmICh0eXBlb2YgYW5pbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGFuaW0gPSB0cnVlO1xuICAgIH1cbiAgICAkLmVhY2goaGVscGVySXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbSkge1xuICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgZWxlbS50ZXh0LnNsaWRlRG93bigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS50ZXh0LnNsaWRlVXAoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgaWYgKCgkKHdpbmRvdykuaGVpZ2h0KCkgPCA3NTApIHx8ICgkKHdpbmRvdykud2lkdGgoKSA8PSA5NjApKSB7XG4gICAgJC5lYWNoKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgIGVsZW0udGV4dC5oaWRlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgJC5lYWNoKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgIGVsZW0udGV4dC5zaG93KCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdQYXJhbGxheCA9ICQod2luZG93KS53aWR0aCgpID4gOTYwO1xuICAgIGlmIChuZXdQYXJhbGxheCAhPSBlbmFibGVQYXJhbGxheCkge1xuICAgICAgZW5hYmxlUGFyYWxsYXggPSBuZXdQYXJhbGxheDtcbiAgICAgIGlmIChlbmFibGVQYXJhbGxheCkge1xuICAgICAgICB0b2dnbGVIZWxwZXJzKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlSGVscGVycyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbiAgJCgnLmZpbHRlciBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIC5maWx0ZXIgc2VsZWN0Jykuc3R5bGVyKCk7XG5cbiAgdmFyIHBhZ2UgPSAkKGRvY3VtZW50LmJvZHkpLmhhc0NsYXNzKCdmcm9udCcpO1xuICBwYWdlID0gcGFnZSA/ICdmcm9udCcgOiAnJztcbiAgcGFnZSA9ICgkKCcuaGVhZGVyX19sb2dvJykubGVuZ3RoID4gMCkgPyAnaW5uZXInIDogcGFnZTtcbiAgc3dpdGNoIChwYWdlKSB7XG4gICAgY2FzZSAnZnJvbnQnOlxuICAgICAgdmFyIGZyb250UGFnZSA9IHJlcXVpcmUoJy4vdmlld3MvZnJvbnQtcGFnZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5uZXInOlxuICAgICAgdmFyIGlubmVyUGFnZSA9IHJlcXVpcmUoJy4vdmlld3MvaW5uZXItcGFnZScpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG4gIGNvbnNvbGUubG9nKHBhZ2UpO1xufSk7XG4iLCJ2YXIgaW1hZ2VzU2VsZWN0b3IgPSBbXG4gIFwiLmdpcmxzIGltZ1wiLFxuICBcIi53ZWxjb21lX19sb2dvIGltZ1wiLFxuICBcIi5naXJsc19faC1iZ19yaWdodFwiLFxuICBcIiNmbG9yYVwiLFxuXS5qb2luKCcsICcpO1xuXG52YXIgc2Nyb2xsVG9FbGVtZW50cyA9IFtcbiAgeyBzZWw6IFwiYVtocmVmPScjZjAnXVwiLCBvZmZzZXQ6IDUwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YxJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjInXVwiLCBvZmZzZXQ6IDYwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YzJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjQnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNSddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y2J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjcnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmOCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Zvb3RlciddXCIsIG9mZnNldDogMTAwIH1cbl07XG5cblxuXG4kKGltYWdlc1NlbGVjdG9yKS5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0pXG4gIC5kb25lKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIH0pXG4gIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIGFsZXJ0KFwi0J3QtSDQstGB0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDRg9C00LDQu9C+0YHRjCDQt9Cw0LPRgNGD0LfQuNGC0YwuINCS0LXQsS3RgdGC0YDQsNC90LjRhtCwINC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMINC40YHQutCw0LbQtdC90L3QvtC5LlwiKTtcbiAgfSlcbiAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdpbWFnZXNMb2FkZWQnKTtcbiAgICAkKCcjcHJlbG9hZGVyJykuZmFkZU91dCh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZSdcbiAgICB9KTtcbiAgICBmcm9udFBhZ2UoKTtcbiAgICBzY3JvbGxUb3MoKTtcbiAgfSk7XG5cbnZhciBzY3JvbGxUb3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgJChlbGVtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgdmFyIGRlc3RpbmF0aW9uICA9ICQoZWxlbWVudENsaWNrKVswXS5vZmZzZXRUb3A7XG4gICAgICBpZihkZXN0aW5hdGlvbiA8IDApIHsgZGVzdGluYXRpb24gPSAwOyB9XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSBvZmZzZXQgfSwgXCJzbG93XCIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2Nyb2xsVG9FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHNjcm9sbFRvRWxlbWVudChzY3JvbGxUb0VsZW1lbnRzW2ldLnNlbCwgc2Nyb2xsVG9FbGVtZW50c1tpXS5vZmZzZXQpO1xuICB9XG59O1xuXG52YXIgZnJvbnRQYWdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoYW5kbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VsY29tZUhhbmRsZScpO1xuICB2YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbiAgdmFyIGdpcmxzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxzQ29udGFpbmVyJyk7XG4gIHZhciAkaGFuZGxlID0gJChoYW5kbGUpO1xuICB2YXIgJGNsb2NrID0gJChcIi5jbG9ja1wiKTtcbiAgdmFyIG1jID0gbmV3IEhhbW1lcihoYW5kbGUpO1xuICB2YXIgZW5hYmxlUGFyYWxsYXggPSBudWxsO1xuICB2YXIgZ2lybHNJbmZvID0ge1xuICAgIHg6IDBcbiAgfTtcblxuICB2YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGdpcmxzSW5mby54ID0gMDtcbiAgICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQ7XG4gICAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICBlbmFibGVQYXJhbGxheCA9IG5ld1BhcmFsbGF4O1xuICAgICAgaWYgKGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICAgIHBhcmFsbGF4MS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFsbGF4MS5kaXNhYmxlKCk7XG4gICAgICAgIHBhcmFsbGF4MS51cGRhdGVMYXllcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH07XG4gICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxuICBtYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG4gIG1jLm9uKFwicGFubW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgZ2lybHNJbmZvLnggPSBNYXRoLm1heChNYXRoLm1pbihnaXJsc0luZm8ueE9yaWcgKyBlLmRlbHRhWCwgZ2lybHNJbmZvLndpZHRoIC8gMiksIC1naXJsc0luZm8ud2lkdGggLyAyKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfSkub24oJ3BhbnN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgZ2lybHNJbmZvLnhPcmlnID0gZ2lybHNJbmZvLng7XG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygncGFubmluZycpO1xuICB9KS5vbigncGFuZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygncGFubmluZycpO1xuICAgIC8vIGdpcmxzSW5mby54ID0gMDtcbiAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcblxuICAgIC8vICQoe2FuaW1WYWw6IGdpcmxzSW5mby54fSkuYW5pbWF0ZSh7YW5pbVZhbDogMH0sIHtcbiAgICAvLyAgIGR1cmF0aW9uOiA2MDAsXG4gICAgLy8gICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJyxcbiAgICAvLyAgIHN0ZXA6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgZ2lybHNJbmZvLnggPSB0aGlzLmFuaW1WYWw7XG4gICAgLy8gICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICAgIC8vICAgfSxcbiAgICAvLyAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH0pO1xuXG4gIHZhciBwYW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsICcgKyAxNSAqIE1hdGguc2luKGdpcmxzSW5mby54IC8gZ2lybHNJbmZvLndpZHRoKSArICdkZWcpJyk7XG4gICAgJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApJyk7XG4gICAgZ2lybC5zdHlsZS5sZWZ0ID0gZ2lybHNJbmZvLndpZHRoIC8gMiArIGdpcmxzSW5mby54ICsgJ3B4JztcbiAgfTtcblxuICB2YXIgc2NlbmUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25zU2NlbmUnKTtcbiAgdmFyIHBhcmFsbGF4MSA9IG5ldyBQYXJhbGxheChzY2VuZTEsIHtcbiAgICBjYWxpYnJhdGVYOiB0cnVlLFxuICAgIGNhbGlicmF0ZVk6IHRydWUsXG4gICAgaW52ZXJ0WDogZmFsc2UsXG4gICAgaW52ZXJ0WTogZmFsc2UsXG4gICAgbGltaXRYOiBmYWxzZSxcbiAgICBsaW1pdFk6IGZhbHNlLFxuICAgIHNjYWxhclg6IDIsXG4gICAgc2NhbGFyWTogMixcbiAgICBmcmljdGlvblg6IDAuMyxcbiAgICBmcmljdGlvblk6IDAuNSxcbiAgICBvcmlnaW5YOiAwLjUsXG4gICAgb3JpZ2luWTogMC41XG4gIH0pO1xuXG4gIHZhciBrbm9iID0ge1xuICAgIG1pbjogMCxcbiAgICBtYXg6IDIwLFxuICAgIHZhbHVlOiAyMCxcbiAgICB3aWR0aDogMjgwLFxuICAgIGhlaWdodDogMjgwLFxuICAgIFBJMjogTWF0aC5QSSAvIDIsXG4gICAgZWxlbTogbnVsbCxcbiAgICBjdHg6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBrbm9iLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbXNDbG9jaycpO1xuICAgICAga25vYi5jdHggPSBrbm9iLmVsZW0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGtub2IuZHJhdygpO1xuICAgIH0sXG4gICAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoa25vYi5mbG9yYVBhdHRlcm4gPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmxvcmFJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvcmEnKTtcbiAgICAgICAga25vYi5mbG9yYVBhdHRlcm4gPSBrbm9iLmN0eC5jcmVhdGVQYXR0ZXJuKGZsb3JhSW1nLCBcInJlcGVhdFwiKTtcbiAgICAgIH1cbiAgICAgIGtub2IuY3R4LmNsZWFyUmVjdCgwLCAwLCBrbm9iLndpZHRoLCBrbm9iLmhlaWdodCk7XG4gICAgICBrbm9iLmN0eC5maWxsU3R5bGUgPSBrbm9iLmZsb3JhUGF0dGVybjtcbiAgICAgIGtub2IuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAga25vYi5jdHgubW92ZVRvKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMik7XG4gICAgICBrbm9iLmN0eC5hcmMoa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwgLWtub2IuUEkyLCAta25vYi5QSTIgKyAoa25vYi5QSTIgKyBrbm9iLlBJMiAvIDMpICogKDEgLSBrbm9iLnZhbHVlIC8ga25vYi5tYXgpLCBmYWxzZSk7XG4gICAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG4gIGtub2IuaW5pdCgpO1xuXG4gICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gIHZhciBzY3JvbGxGdW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgJGhlYWRlci50b2dnbGVDbGFzcygnZml4ZWQnLCAkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTApO1xuXG4gICAgdmFyICRteUVsZW0gPSAkKCcjcHJvYmxlbXMnKTtcbiAgICBpZigoKCQodGhpcykuc2Nyb2xsVG9wKCkpID49ICRteUVsZW0ub2Zmc2V0KCkudG9wKSAmJiAoISRteUVsZW0uaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSkge1xuICAgICAgJG15RWxlbS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICAkKHthbmltYXRlZFZhbDoga25vYi5tYXh9KS5hbmltYXRlKHthbmltYXRlZFZhbDoga25vYi5taW59LCB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICBlYXNpbmc6IFwiZWFzZUluT3V0U2luZVwiLFxuICAgICAgICBzdGVwOiBmdW5jdGlvbigpIHsgXG4gICAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkbXlFbGVtLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgIH0sIDUwMDApO1xuICAgIH1cbiAgfTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsRnVuKTtcbiAgJChkb2N1bWVudCkucmVhZHkoc2Nyb2xsRnVuKTtcblxuICB3aW5kb3dSZXNpemUoKTtcbn1cbiIsIihmdW5jdGlvbiAoKSB7XG4gIHZhciAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuICB2YXIgJGxvZ28gPSAkaGVhZGVyLmZpbmQoJy5oZWFkZXJfX2xvZ28nKTtcbiAgdmFyIGhlaWdodCA9ICRsb2dvLm91dGVySGVpZ2h0KCk7XG4gIHZhciBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgdmFyIHNjcm9sbEZ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgaWYgKChpc0ZpeGVkICYmIChzY3JvbGxUb3AgPiBoZWlnaHQpKSB8fCAoIWlzRml4ZWQgJiYgKHNjcm9sbFRvcCA8PSBoZWlnaHQpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzY3JvbGxUb3AgPiBoZWlnaHQpIHtcbiAgICAgICRoZWFkZXIuY3NzKCd0cmFuc2Zvcm0nLCBcInRyYW5zbGF0ZTNkKDAsIC1cIiArICRsb2dvLm91dGVySGVpZ2h0KCkgKyBcInB4LCAwKVwiKTtcbiAgICAgICQoJ2hlYWRlcicpLmFkZENsYXNzKCdmaXhlZCcpO1xuICAgICAgaXNGaXhlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICRoZWFkZXIuY3NzKCd0cmFuc2Zvcm0nLCBcIm5vbmVcIik7XG4gICAgICAkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcbiAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIHNjcm9sbEZ1bik7XG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgIGhlaWdodCA9ICRsb2dvLm91dGVySGVpZ2h0KCk7XG4gICAgc2Nyb2xsRnVuKCk7XG4gIH0pO1xuICAkKGRvY3VtZW50KS5yZWFkeShzY3JvbGxGdW4pO1xuXG59KSgpO1xuIl19
