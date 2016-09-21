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
    var newParallax = $(window).width() > 960;
    if (newParallax != enableParallax) {
      enableParallax = newParallax;
      if (enableParallax) {
        parallax1.enable();
      } else {
        parallax1.disable();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZnVuY3Rpb24oKSB7XG4gIHZhciBlbmFibGVQYXJhbGxheCA9IG51bGw7XG4gIHZhciBoZWxwZXJJdGVtcyA9IFtdO1xuXG4gICQoJy5saXRlcmF0dXJlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAkKCcuZm9vdGVyX19sZWdhbCAuZm9vdGVyX19jb250Jykuc2hvdygpO1xuICB9KTtcbiAgJCgnLnJlYWRNb3JlRm9vdGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmZvb3Rlcl9fbGVnYWwgLmZvb3Rlcl9fY29udCcpLnNsaWRlVG9nZ2xlKCk7XG4gIH0pO1xuXG4gICQoJy5wZFNsaWRlJykuZWFjaChmdW5jdGlvbiAoZSkge1xuICAgIGhlbHBlckl0ZW1zLnB1c2goe1xuICAgICAgZWxlbTogdGhpcyxcbiAgICAgIHRvZ2dsZWQ6IGZhbHNlLFxuICAgICAgdGV4dDogJCh0aGlzKS5maW5kKCcucGRTbGlkZV9faW5mbycpLFxuICAgIH0pO1xuICB9KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICR0aGlzID0gJCh0aGlzKTtcbiAgICB2YXIgaXRlbSA9ICQuZ3JlcChoZWxwZXJJdGVtcywgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHJldHVybiBlbGVtLmVsZW0gPT0gJHRoaXNbMF07XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBpdGVtWzBdICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICBpdGVtWzBdLnRvZ2dsZWQgPSB0cnVlO1xuICAgICAgaXRlbVswXS50ZXh0LnNsaWRlVG9nZ2xlKCk7XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiB0b2dnbGVIZWxwZXJzKHNob3csIGFuaW0pIHtcbiAgICBpZiAodHlwZW9mIGFuaW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBhbmltID0gdHJ1ZTtcbiAgICB9XG4gICAgJC5lYWNoKGhlbHBlckl0ZW1zLCBmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgIGlmIChzaG93KSB7XG4gICAgICAgIGVsZW0udGV4dC5zbGlkZURvd24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW0udGV4dC5zbGlkZVVwKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIGlmICgoJCh3aW5kb3cpLmhlaWdodCgpIDwgNzUwKSB8fCAoJCh3aW5kb3cpLndpZHRoKCkgPD0gOTYwKSkge1xuICAgICQuZWFjaChoZWxwZXJJdGVtcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XG4gICAgICBlbGVtLnRleHQuaGlkZSgpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICQuZWFjaChoZWxwZXJJdGVtcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XG4gICAgICBlbGVtLnRleHQuc2hvdygpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDk2MDtcbiAgICBpZiAobmV3UGFyYWxsYXggIT0gZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIGVuYWJsZVBhcmFsbGF4ID0gbmV3UGFyYWxsYXg7XG4gICAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgICAgdG9nZ2xlSGVscGVycyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZUhlbHBlcnMoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuXG4gIHZhciBwYWdlID0gJChkb2N1bWVudC5ib2R5KS5oYXNDbGFzcygnZnJvbnQnKTtcbiAgcGFnZSA9IHBhZ2UgPyAnZnJvbnQnIDogJyc7XG4gIHN3aXRjaCAocGFnZSkge1xuICAgIGNhc2UgJ2Zyb250JzpcbiAgICAgIHZhciBmcm9udFBhZ2UgPSByZXF1aXJlKCcuL3ZpZXdzL2Zyb250LXBhZ2UnKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufSk7XG4iLCJ2YXIgaW1hZ2VzU2VsZWN0b3IgPSBbXG4gIFwiLmdpcmxzIGltZ1wiLFxuICBcIi53ZWxjb21lX19sb2dvIGltZ1wiLFxuICBcIi5naXJsc19faC1iZ19yaWdodFwiLFxuICBcIiNmbG9yYVwiLFxuXS5qb2luKCcsICcpO1xuXG52YXIgc2Nyb2xsVG9FbGVtZW50cyA9IFtcbiAgeyBzZWw6IFwiYVtocmVmPScjZjAnXVwiLCBvZmZzZXQ6IDUwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YxJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjInXVwiLCBvZmZzZXQ6IDYwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YzJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjQnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNSddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y2J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjcnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmOCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Zvb3RlciddXCIsIG9mZnNldDogMTAwIH1cbl07XG5cblxuXG4kKGltYWdlc1NlbGVjdG9yKS5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0pXG4gIC5kb25lKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIH0pXG4gIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIGFsZXJ0KFwi0J3QtSDQstGB0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDRg9C00LDQu9C+0YHRjCDQt9Cw0LPRgNGD0LfQuNGC0YwuINCS0LXQsS3RgdGC0YDQsNC90LjRhtCwINC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMINC40YHQutCw0LbQtdC90L3QvtC5LlwiKTtcbiAgfSlcbiAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdpbWFnZXNMb2FkZWQnKTtcbiAgICAkKCcjcHJlbG9hZGVyJykuZmFkZU91dCh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZSdcbiAgICB9KTtcbiAgICBmcm9udFBhZ2UoKTtcbiAgICBzY3JvbGxUb3MoKTtcbiAgfSk7XG5cbnZhciBzY3JvbGxUb3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgJChlbGVtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgdmFyIGRlc3RpbmF0aW9uICA9ICQoZWxlbWVudENsaWNrKVswXS5vZmZzZXRUb3A7XG4gICAgICBpZihkZXN0aW5hdGlvbiA8IDApIHsgZGVzdGluYXRpb24gPSAwOyB9XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSBvZmZzZXQgfSwgXCJzbG93XCIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2Nyb2xsVG9FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHNjcm9sbFRvRWxlbWVudChzY3JvbGxUb0VsZW1lbnRzW2ldLnNlbCwgc2Nyb2xsVG9FbGVtZW50c1tpXS5vZmZzZXQpO1xuICB9XG59O1xuXG52YXIgZnJvbnRQYWdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoYW5kbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VsY29tZUhhbmRsZScpO1xuICB2YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbiAgdmFyIGdpcmxzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxzQ29udGFpbmVyJyk7XG4gIHZhciAkaGFuZGxlID0gJChoYW5kbGUpO1xuICB2YXIgJGNsb2NrID0gJChcIi5jbG9ja1wiKTtcbiAgdmFyIG1jID0gbmV3IEhhbW1lcihoYW5kbGUpO1xuICB2YXIgZW5hYmxlUGFyYWxsYXggPSBudWxsO1xuICB2YXIgZ2lybHNJbmZvID0ge1xuICAgIHg6IDBcbiAgfTtcblxuICB2YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGdpcmxzSW5mby54ID0gMDtcbiAgICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDk2MDtcbiAgICBpZiAobmV3UGFyYWxsYXggIT0gZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIGVuYWJsZVBhcmFsbGF4ID0gbmV3UGFyYWxsYXg7XG4gICAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgICAgcGFyYWxsYXgxLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYWxsYXgxLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH07XG4gICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxuICBtYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG4gIG1jLm9uKFwicGFubW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgZ2lybHNJbmZvLnggPSBNYXRoLm1heChNYXRoLm1pbihnaXJsc0luZm8ueE9yaWcgKyBlLmRlbHRhWCwgZ2lybHNJbmZvLndpZHRoIC8gMiksIC1naXJsc0luZm8ud2lkdGggLyAyKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfSkub24oJ3BhbnN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgZ2lybHNJbmZvLnhPcmlnID0gZ2lybHNJbmZvLng7XG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygncGFubmluZycpO1xuICB9KS5vbigncGFuZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygncGFubmluZycpO1xuICAgIC8vIGdpcmxzSW5mby54ID0gMDtcbiAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcblxuICAgIC8vICQoe2FuaW1WYWw6IGdpcmxzSW5mby54fSkuYW5pbWF0ZSh7YW5pbVZhbDogMH0sIHtcbiAgICAvLyAgIGR1cmF0aW9uOiA2MDAsXG4gICAgLy8gICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJyxcbiAgICAvLyAgIHN0ZXA6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgZ2lybHNJbmZvLnggPSB0aGlzLmFuaW1WYWw7XG4gICAgLy8gICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICAgIC8vICAgfSxcbiAgICAvLyAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH0pO1xuXG4gIHZhciBwYW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsICcgKyAxNSAqIE1hdGguc2luKGdpcmxzSW5mby54IC8gZ2lybHNJbmZvLndpZHRoKSArICdkZWcpJyk7XG4gICAgJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApJyk7XG4gICAgZ2lybC5zdHlsZS5sZWZ0ID0gZ2lybHNJbmZvLndpZHRoIC8gMiArIGdpcmxzSW5mby54ICsgJ3B4JztcbiAgfTtcblxuICB2YXIgc2NlbmUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25zU2NlbmUnKTtcbiAgdmFyIHBhcmFsbGF4MSA9IG5ldyBQYXJhbGxheChzY2VuZTEsIHtcbiAgICBjYWxpYnJhdGVYOiB0cnVlLFxuICAgIGNhbGlicmF0ZVk6IHRydWUsXG4gICAgaW52ZXJ0WDogZmFsc2UsXG4gICAgaW52ZXJ0WTogZmFsc2UsXG4gICAgbGltaXRYOiBmYWxzZSxcbiAgICBsaW1pdFk6IGZhbHNlLFxuICAgIHNjYWxhclg6IDIsXG4gICAgc2NhbGFyWTogMixcbiAgICBmcmljdGlvblg6IDAuMyxcbiAgICBmcmljdGlvblk6IDAuNSxcbiAgICBvcmlnaW5YOiAwLjUsXG4gICAgb3JpZ2luWTogMC41XG4gIH0pO1xuXG4gIHZhciBrbm9iID0ge1xuICAgIG1pbjogMCxcbiAgICBtYXg6IDIwLFxuICAgIHZhbHVlOiAyMCxcbiAgICB3aWR0aDogMjgwLFxuICAgIGhlaWdodDogMjgwLFxuICAgIFBJMjogTWF0aC5QSSAvIDIsXG4gICAgZWxlbTogbnVsbCxcbiAgICBjdHg6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBrbm9iLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbXNDbG9jaycpO1xuICAgICAga25vYi5jdHggPSBrbm9iLmVsZW0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGtub2IuZHJhdygpO1xuICAgIH0sXG4gICAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoa25vYi5mbG9yYVBhdHRlcm4gPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmxvcmFJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvcmEnKTtcbiAgICAgICAga25vYi5mbG9yYVBhdHRlcm4gPSBrbm9iLmN0eC5jcmVhdGVQYXR0ZXJuKGZsb3JhSW1nLCBcInJlcGVhdFwiKTtcbiAgICAgIH1cbiAgICAgIGtub2IuY3R4LmNsZWFyUmVjdCgwLCAwLCBrbm9iLndpZHRoLCBrbm9iLmhlaWdodCk7XG4gICAgICBrbm9iLmN0eC5maWxsU3R5bGUgPSBrbm9iLmZsb3JhUGF0dGVybjtcbiAgICAgIGtub2IuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAga25vYi5jdHgubW92ZVRvKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMik7XG4gICAgICBrbm9iLmN0eC5hcmMoa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwgLWtub2IuUEkyLCAta25vYi5QSTIgKyAoa25vYi5QSTIgKyBrbm9iLlBJMiAvIDMpICogKDEgLSBrbm9iLnZhbHVlIC8ga25vYi5tYXgpLCBmYWxzZSk7XG4gICAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG4gIGtub2IuaW5pdCgpO1xuXG4gICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkaGVhZGVyLnRvZ2dsZUNsYXNzKCdmaXhlZCcsICQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMCk7XG5cbiAgICB2YXIgJG15RWxlbSA9ICQoJyNwcm9ibGVtcycpO1xuICAgIGlmKCgoJCh0aGlzKS5zY3JvbGxUb3AoKSkgPj0gJG15RWxlbS5vZmZzZXQoKS50b3ApICYmICghJG15RWxlbS5oYXNDbGFzcygnYW5pbWF0aW5nJykpKSB7XG4gICAgICAkbXlFbGVtLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRTaW5lXCIsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICRteUVsZW0ucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgfSwgNTAwMCk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3dSZXNpemUoKTtcbn1cbiJdfQ==
