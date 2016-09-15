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
      if (!elem.toggled) {
        if (anim) {
          elem.text.slideToggle(show);
        } else {
          elem.text.toggle();
        }
      }
    });
  };
  if ($(window).height() < 750) {
    toggleHelpers(false, false);
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
      $('#container').animate({ scrollTop: destination - offset }, "slow");
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
  document.getElementById('container').addEventListener('scroll', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKGZ1bmN0aW9uKCkge1xuICB2YXIgZW5hYmxlUGFyYWxsYXggPSBudWxsO1xuICB2YXIgaGVscGVySXRlbXMgPSBbXTtcblxuICAkKCcubGl0ZXJhdHVyZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgJCgnLmZvb3Rlcl9fbGVnYWwgLmZvb3Rlcl9fY29udCcpLnNob3coKTtcbiAgfSk7XG4gICQoJy5yZWFkTW9yZUZvb3RlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJy5mb290ZXJfX2xlZ2FsIC5mb290ZXJfX2NvbnQnKS5zbGlkZVRvZ2dsZSgpO1xuICB9KTtcblxuICAkKCcucGRTbGlkZScpLmVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICBoZWxwZXJJdGVtcy5wdXNoKHtcbiAgICAgIGVsZW06IHRoaXMsXG4gICAgICB0b2dnbGVkOiBmYWxzZSxcbiAgICAgIHRleHQ6ICQodGhpcykuZmluZCgnLnBkU2xpZGVfX2luZm8nKSxcbiAgICB9KTtcbiAgfSkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGl0ZW0gPSAkLmdyZXAoaGVscGVySXRlbXMsIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbS5lbGVtID09ICR0aGlzWzBdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgaXRlbVswXSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgaXRlbVswXS50b2dnbGVkID0gdHJ1ZTtcbiAgICAgIGl0ZW1bMF0udGV4dC5zbGlkZVRvZ2dsZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlSGVscGVycyhzaG93LCBhbmltKSB7XG4gICAgaWYgKHR5cGVvZiBhbmltID09PSAndW5kZWZpbmVkJykge1xuICAgICAgYW5pbSA9IHRydWU7XG4gICAgfVxuICAgICQuZWFjaChoZWxwZXJJdGVtcywgZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XG4gICAgICBpZiAoIWVsZW0udG9nZ2xlZCkge1xuICAgICAgICBpZiAoYW5pbSkge1xuICAgICAgICAgIGVsZW0udGV4dC5zbGlkZVRvZ2dsZShzaG93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtLnRleHQudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgaWYgKCQod2luZG93KS5oZWlnaHQoKSA8IDc1MCkge1xuICAgIHRvZ2dsZUhlbHBlcnMoZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIHZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld1BhcmFsbGF4ID0gJCh3aW5kb3cpLndpZHRoKCkgPiA5NjA7XG4gICAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICBlbmFibGVQYXJhbGxheCA9IG5ld1BhcmFsbGF4O1xuICAgICAgaWYgKGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICAgIHRvZ2dsZUhlbHBlcnModHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGVIZWxwZXJzKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxuICB2YXIgcGFnZSA9ICQoZG9jdW1lbnQuYm9keSkuaGFzQ2xhc3MoJ2Zyb250Jyk7XG4gIHBhZ2UgPSBwYWdlID8gJ2Zyb250JyA6ICcnO1xuICBzd2l0Y2ggKHBhZ2UpIHtcbiAgICBjYXNlICdmcm9udCc6XG4gICAgICB2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuIiwidmFyIGltYWdlc1NlbGVjdG9yID0gW1xuICBcIi5naXJscyBpbWdcIixcbiAgXCIud2VsY29tZV9fbG9nbyBpbWdcIixcbiAgXCIuZ2lybHNfX2gtYmdfcmlnaHRcIixcbiAgXCIjZmxvcmFcIixcbl0uam9pbignLCAnKTtcblxudmFyIHNjcm9sbFRvRWxlbWVudHMgPSBbXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YwJ11cIiwgb2Zmc2V0OiA1MCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMSddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YyJ11cIiwgb2Zmc2V0OiA2MCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMyddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y0J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjUnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNiddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y3J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjgnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmb290ZXInXVwiLCBvZmZzZXQ6IDEwMCB9XG5dO1xuXG5cblxuJChpbWFnZXNTZWxlY3RvcikuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9KVxuICAuZG9uZShmdW5jdGlvbihpbnN0YW5jZSkge1xuICB9KVxuICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICBhbGVydChcItCd0LUg0LLRgdC1INC40LfQvtCx0YDQsNC20LXQvdC40Y8g0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMLiDQktC10LEt0YHRgtGA0LDQvdC40YbQsCDQvNC+0LbQtdGCINCy0YvQs9C70Y/QtNC10YLRjCDQuNGB0LrQsNC20LXQvdC90L7QuS5cIik7XG4gIH0pXG4gIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnaW1hZ2VzTG9hZGVkJyk7XG4gICAgJCgnI3ByZWxvYWRlcicpLmZhZGVPdXQoe1xuICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnXG4gICAgfSk7XG4gICAgZnJvbnRQYWdlKCk7XG4gICAgc2Nyb2xsVG9zKCk7XG4gIH0pO1xuXG52YXIgc2Nyb2xsVG9zID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2Nyb2xsVG9FbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICQoZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcbiAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSAkKGVsZW1lbnRDbGljaylbMF0ub2Zmc2V0VG9wO1xuICAgICAgaWYoZGVzdGluYXRpb24gPCAwKSB7IGRlc3RpbmF0aW9uID0gMDsgfVxuICAgICAgJCgnI2NvbnRhaW5lcicpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gb2Zmc2V0IH0sIFwic2xvd1wiKTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNjcm9sbFRvRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBzY3JvbGxUb0VsZW1lbnQoc2Nyb2xsVG9FbGVtZW50c1tpXS5zZWwsIHNjcm9sbFRvRWxlbWVudHNbaV0ub2Zmc2V0KTtcbiAgfVxufTtcblxudmFyIGZyb250UGFnZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVIYW5kbGUnKTtcbiAgdmFyIGdpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybEFmdGVyJyk7XG4gIHZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xuICB2YXIgJGhhbmRsZSA9ICQoaGFuZGxlKTtcbiAgdmFyICRjbG9jayA9ICQoXCIuY2xvY2tcIik7XG4gIHZhciBtYyA9IG5ldyBIYW1tZXIoaGFuZGxlKTtcbiAgdmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbiAgdmFyIGdpcmxzSW5mbyA9IHtcbiAgICB4OiAwXG4gIH07XG5cbiAgdmFyIHdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBnaXJsc0luZm8ud2lkdGggPSBnaXJsc0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICBnaXJsc0luZm8ueCA9IDA7XG4gICAgdmFyIG5ld1BhcmFsbGF4ID0gJCh3aW5kb3cpLndpZHRoKCkgPiA5NjA7XG4gICAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICBlbmFibGVQYXJhbGxheCA9IG5ld1BhcmFsbGF4O1xuICAgICAgaWYgKGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICAgIHBhcmFsbGF4MS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFsbGF4MS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICB9O1xuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbiAgbWMuZ2V0KCdwYW4nKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCB9KTtcblxuICBtYy5vbihcInBhbm1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgIGdpcmxzSW5mby54ID0gTWF0aC5tYXgoTWF0aC5taW4oZ2lybHNJbmZvLnhPcmlnICsgZS5kZWx0YVgsIGdpcmxzSW5mby53aWR0aCAvIDIpLCAtZ2lybHNJbmZvLndpZHRoIC8gMik7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH0pLm9uKCdwYW5zdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgIGdpcmxzSW5mby54T3JpZyA9IGdpcmxzSW5mby54O1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgICAvLyBnaXJsc0luZm8ueCA9IDA7XG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG5cbiAgICAvLyAkKHthbmltVmFsOiBnaXJsc0luZm8ueH0pLmFuaW1hdGUoe2FuaW1WYWw6IDB9LCB7XG4gICAgLy8gICBkdXJhdGlvbjogNjAwLFxuICAgIC8vICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZScsXG4gICAgLy8gICBzdGVwOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIGdpcmxzSW5mby54ID0gdGhpcy5hbmltVmFsO1xuICAgIC8vICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9KTtcblxuICB2YXIgcGFuID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICRoYW5kbGUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGdpcmxzSW5mby54ICsgJ3B4LCAwLCAwKSByb3RhdGUzZCgwLCAxLCAwLCAnICsgMTUgKiBNYXRoLnNpbihnaXJsc0luZm8ueCAvIGdpcmxzSW5mby53aWR0aCkgKyAnZGVnKScpO1xuICAgICRoYW5kbGUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGdpcmxzSW5mby54ICsgJ3B4LCAwLCAwKScpO1xuICAgIGdpcmwuc3R5bGUubGVmdCA9IGdpcmxzSW5mby53aWR0aCAvIDIgKyBnaXJsc0luZm8ueCArICdweCc7XG4gIH07XG5cbiAgdmFyIHNjZW5lMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduc1NjZW5lJyk7XG4gIHZhciBwYXJhbGxheDEgPSBuZXcgUGFyYWxsYXgoc2NlbmUxLCB7XG4gICAgY2FsaWJyYXRlWDogdHJ1ZSxcbiAgICBjYWxpYnJhdGVZOiB0cnVlLFxuICAgIGludmVydFg6IGZhbHNlLFxuICAgIGludmVydFk6IGZhbHNlLFxuICAgIGxpbWl0WDogZmFsc2UsXG4gICAgbGltaXRZOiBmYWxzZSxcbiAgICBzY2FsYXJYOiAyLFxuICAgIHNjYWxhclk6IDIsXG4gICAgZnJpY3Rpb25YOiAwLjMsXG4gICAgZnJpY3Rpb25ZOiAwLjUsXG4gICAgb3JpZ2luWDogMC41LFxuICAgIG9yaWdpblk6IDAuNVxuICB9KTtcblxuICB2YXIga25vYiA9IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAyMCxcbiAgICB2YWx1ZTogMjAsXG4gICAgd2lkdGg6IDI4MCxcbiAgICBoZWlnaHQ6IDI4MCxcbiAgICBQSTI6IE1hdGguUEkgLyAyLFxuICAgIGVsZW06IG51bGwsXG4gICAgY3R4OiBudWxsLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAga25vYi5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1zQ2xvY2snKTtcbiAgICAgIGtub2IuY3R4ID0ga25vYi5lbGVtLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBrbm9iLmRyYXcoKTtcbiAgICB9LFxuICAgIGRyYXc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGtub2IuZmxvcmFQYXR0ZXJuID09IG51bGwpIHtcbiAgICAgICAgdmFyIGZsb3JhSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zsb3JhJyk7XG4gICAgICAgIGtub2IuZmxvcmFQYXR0ZXJuID0ga25vYi5jdHguY3JlYXRlUGF0dGVybihmbG9yYUltZywgXCJyZXBlYXRcIik7XG4gICAgICB9XG4gICAgICBrbm9iLmN0eC5jbGVhclJlY3QoMCwgMCwga25vYi53aWR0aCwga25vYi5oZWlnaHQpO1xuICAgICAga25vYi5jdHguZmlsbFN0eWxlID0ga25vYi5mbG9yYVBhdHRlcm47XG4gICAgICBrbm9iLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGtub2IuY3R4Lm1vdmVUbyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIpO1xuICAgICAga25vYi5jdHguYXJjKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIC1rbm9iLlBJMiwgLWtub2IuUEkyICsgKGtub2IuUEkyICsga25vYi5QSTIgLyAzKSAqICgxIC0ga25vYi52YWx1ZSAvIGtub2IubWF4KSwgZmFsc2UpO1xuICAgICAga25vYi5jdHguY2xvc2VQYXRoKCk7XG4gICAgICBrbm9iLmN0eC5maWxsKCk7XG4gICAgfVxuICB9O1xuICBrbm9iLmluaXQoKTtcblxuICAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICRoZWFkZXIudG9nZ2xlQ2xhc3MoJ2ZpeGVkJywgJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEwKTtcblxuICAgIHZhciAkbXlFbGVtID0gJCgnI3Byb2JsZW1zJyk7XG4gICAgaWYoKCgkKHRoaXMpLnNjcm9sbFRvcCgpKSA+PSAkbXlFbGVtLm9mZnNldCgpLnRvcCkgJiYgKCEkbXlFbGVtLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkpIHtcbiAgICAgICRteUVsZW0uYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgJCh7YW5pbWF0ZWRWYWw6IGtub2IubWF4fSkuYW5pbWF0ZSh7YW5pbWF0ZWRWYWw6IGtub2IubWlufSwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFNpbmVcIixcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oKSB7IFxuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJG15RWxlbS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICB9LCA1MDAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvd1Jlc2l6ZSgpO1xufVxuIl19
