(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js":[function(require,module,exports){
$(function() {
  var frontPage = require('./views/front-page');
});

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
var imagesSelector = [
  ".girls img",
  ".welcome__logo img",
  ".girls__h-bg_right",
  "#flora",
].join(', ');

var scrollToElements = [
  { sel: "a[href='#f0']", offset: 100 },
  { sel: "a[href='#f1']", offset: 200 },
  { sel: "a[href='#f2']", offset: 100 },
  { sel: "a[href='#f3']", offset: 100 },
  { sel: "a[href='#f4']", offset: 100 },
  { sel: "a[href='#f5']", offset: 100 },
  { sel: "a[href='#f6']", offset: 100 },
  { sel: "a[href='#f7']", offset: 100 },
  { sel: "a[href='#f8']", offset: 100 },
  { sel: "a[href='#footer']", offset: 100 }
];

var scrollTos = function () {
  var scrollToElement = function (element, offset) {
    $(element).click(function(e) {
      e.preventDefault();

      var elementClick = $(this).attr("href");
      var destination  = $(elementClick)[0].offsetTop;
      if(destination < 0) { destination = 0; }
      console.log($(elementClick), $(elementClick)[0].offsetTop);
      $('#container').animate({ scrollTop: destination - offset }, "slow");
    });
  }

  for (var i = 0; i < scrollToElements.length; i++) {
    scrollToElement(scrollToElements[i].sel, scrollToElements[i].offset);
  }
};

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
      knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, -knob.PI2, -knob.PI2 + knob.value * Math.PI * 2 / knob.max, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcbiAgdmFyIGZyb250UGFnZSA9IHJlcXVpcmUoJy4vdmlld3MvZnJvbnQtcGFnZScpO1xufSk7XG4iLCJ2YXIgaW1hZ2VzU2VsZWN0b3IgPSBbXG4gIFwiLmdpcmxzIGltZ1wiLFxuICBcIi53ZWxjb21lX19sb2dvIGltZ1wiLFxuICBcIi5naXJsc19faC1iZ19yaWdodFwiLFxuICBcIiNmbG9yYVwiLFxuXS5qb2luKCcsICcpO1xuXG52YXIgc2Nyb2xsVG9FbGVtZW50cyA9IFtcbiAgeyBzZWw6IFwiYVtocmVmPScjZjAnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMSddXCIsIG9mZnNldDogMjAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YyJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjMnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y1J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjYnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNyddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y4J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZm9vdGVyJ11cIiwgb2Zmc2V0OiAxMDAgfVxuXTtcblxudmFyIHNjcm9sbFRvcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNjcm9sbFRvRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvZmZzZXQpIHtcbiAgICAkKGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIGVsZW1lbnRDbGljayA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG4gICAgICB2YXIgZGVzdGluYXRpb24gID0gJChlbGVtZW50Q2xpY2spWzBdLm9mZnNldFRvcDtcbiAgICAgIGlmKGRlc3RpbmF0aW9uIDwgMCkgeyBkZXN0aW5hdGlvbiA9IDA7IH1cbiAgICAgIGNvbnNvbGUubG9nKCQoZWxlbWVudENsaWNrKSwgJChlbGVtZW50Q2xpY2spWzBdLm9mZnNldFRvcCk7XG4gICAgICAkKCcjY29udGFpbmVyJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogZGVzdGluYXRpb24gLSBvZmZzZXQgfSwgXCJzbG93XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY3JvbGxUb0VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgc2Nyb2xsVG9FbGVtZW50KHNjcm9sbFRvRWxlbWVudHNbaV0uc2VsLCBzY3JvbGxUb0VsZW1lbnRzW2ldLm9mZnNldCk7XG4gIH1cbn07XG5cbiQoaW1hZ2VzU2VsZWN0b3IpLmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSlcbiAgLmRvbmUoZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgfSlcbiAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgYWxlcnQoXCLQndC1INCy0YHQtSDQuNC30L7QsdGA0LDQttC10L3QuNGPINGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjC4g0JLQtdCxLdGB0YLRgNCw0L3QuNGG0LAg0LzQvtC20LXRgiDQstGL0LPQu9GP0LTQtdGC0Ywg0LjRgdC60LDQttC10L3QvdC+0LkuXCIpO1xuICB9KVxuICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ2ltYWdlc0xvYWRlZCcpO1xuICAgICQoJyNwcmVsb2FkZXInKS5mYWRlT3V0KHtcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJ1xuICAgIH0pO1xuICAgIGZyb250UGFnZSgpO1xuICAgIHNjcm9sbFRvcygpO1xuICB9KTtcblxudmFyIGZyb250UGFnZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVIYW5kbGUnKTtcbiAgdmFyIGdpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybEFmdGVyJyk7XG4gIHZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xuICB2YXIgJGhhbmRsZSA9ICQoaGFuZGxlKTtcbiAgdmFyICRjbG9jayA9ICQoXCIuY2xvY2tcIik7XG4gIHZhciBtYyA9IG5ldyBIYW1tZXIoaGFuZGxlKTtcbiAgdmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbiAgdmFyIGdpcmxzSW5mbyA9IHtcbiAgICB4OiAwXG4gIH07XG5cbiAgdmFyIHdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBnaXJsc0luZm8ud2lkdGggPSBnaXJsc0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICBnaXJsc0luZm8ueCA9IDA7XG4gICAgdmFyIG5ld1BhcmFsbGF4ID0gJCh3aW5kb3cpLndpZHRoKCkgPiA5NjA7XG4gICAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICBlbmFibGVQYXJhbGxheCA9IG5ld1BhcmFsbGF4O1xuICAgICAgaWYgKGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICAgIHBhcmFsbGF4MS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFsbGF4MS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICB9O1xuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbiAgbWMuZ2V0KCdwYW4nKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCB9KTtcblxuICBtYy5vbihcInBhbm1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgIGdpcmxzSW5mby54ID0gTWF0aC5tYXgoTWF0aC5taW4oZ2lybHNJbmZvLnhPcmlnICsgZS5kZWx0YVgsIGdpcmxzSW5mby53aWR0aCAvIDIpLCAtZ2lybHNJbmZvLndpZHRoIC8gMik7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH0pLm9uKCdwYW5zdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgIGdpcmxzSW5mby54T3JpZyA9IGdpcmxzSW5mby54O1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgICAvLyBnaXJsc0luZm8ueCA9IDA7XG4gICAgLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG5cbiAgICAvLyAkKHthbmltVmFsOiBnaXJsc0luZm8ueH0pLmFuaW1hdGUoe2FuaW1WYWw6IDB9LCB7XG4gICAgLy8gICBkdXJhdGlvbjogNjAwLFxuICAgIC8vICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZScsXG4gICAgLy8gICBzdGVwOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIGdpcmxzSW5mby54ID0gdGhpcy5hbmltVmFsO1xuICAgIC8vICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgICAvLyAgIH0sXG4gICAgLy8gICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9KTtcblxuICB2YXIgcGFuID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICRoYW5kbGUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGdpcmxzSW5mby54ICsgJ3B4LCAwLCAwKSByb3RhdGUzZCgwLCAxLCAwLCAnICsgMTUgKiBNYXRoLnNpbihnaXJsc0luZm8ueCAvIGdpcmxzSW5mby53aWR0aCkgKyAnZGVnKScpO1xuICAgICRoYW5kbGUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGdpcmxzSW5mby54ICsgJ3B4LCAwLCAwKScpO1xuICAgIGdpcmwuc3R5bGUubGVmdCA9IGdpcmxzSW5mby53aWR0aCAvIDIgKyBnaXJsc0luZm8ueCArICdweCc7XG4gIH07XG5cbiAgdmFyIHNjZW5lMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduc1NjZW5lJyk7XG4gIHZhciBwYXJhbGxheDEgPSBuZXcgUGFyYWxsYXgoc2NlbmUxLCB7XG4gICAgY2FsaWJyYXRlWDogdHJ1ZSxcbiAgICBjYWxpYnJhdGVZOiB0cnVlLFxuICAgIGludmVydFg6IGZhbHNlLFxuICAgIGludmVydFk6IGZhbHNlLFxuICAgIGxpbWl0WDogZmFsc2UsXG4gICAgbGltaXRZOiBmYWxzZSxcbiAgICBzY2FsYXJYOiAyLFxuICAgIHNjYWxhclk6IDIsXG4gICAgZnJpY3Rpb25YOiAwLjMsXG4gICAgZnJpY3Rpb25ZOiAwLjUsXG4gICAgb3JpZ2luWDogMC41LFxuICAgIG9yaWdpblk6IDAuNVxuICB9KTtcblxuICB2YXIga25vYiA9IHtcbiAgICBtaW46IDAsXG4gICAgbWF4OiAyMCxcbiAgICB2YWx1ZTogMjAsXG4gICAgd2lkdGg6IDI4MCxcbiAgICBoZWlnaHQ6IDI4MCxcbiAgICBQSTI6IE1hdGguUEkgLyAyLFxuICAgIGVsZW06IG51bGwsXG4gICAgY3R4OiBudWxsLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAga25vYi5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1zQ2xvY2snKTtcbiAgICAgIGtub2IuY3R4ID0ga25vYi5lbGVtLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBrbm9iLmRyYXcoKTtcbiAgICB9LFxuICAgIGRyYXc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGtub2IuZmxvcmFQYXR0ZXJuID09IG51bGwpIHtcbiAgICAgICAgdmFyIGZsb3JhSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zsb3JhJyk7XG4gICAgICAgIGtub2IuZmxvcmFQYXR0ZXJuID0ga25vYi5jdHguY3JlYXRlUGF0dGVybihmbG9yYUltZywgXCJyZXBlYXRcIik7XG4gICAgICB9XG4gICAgICBrbm9iLmN0eC5jbGVhclJlY3QoMCwgMCwga25vYi53aWR0aCwga25vYi5oZWlnaHQpO1xuICAgICAga25vYi5jdHguZmlsbFN0eWxlID0ga25vYi5mbG9yYVBhdHRlcm47XG4gICAgICBrbm9iLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGtub2IuY3R4Lm1vdmVUbyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIpO1xuICAgICAga25vYi5jdHguYXJjKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIC1rbm9iLlBJMiwgLWtub2IuUEkyICsga25vYi52YWx1ZSAqIE1hdGguUEkgKiAyIC8ga25vYi5tYXgsIGZhbHNlKTtcbiAgICAgIGtub2IuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAga25vYi5jdHguZmlsbCgpO1xuICAgIH1cbiAgfTtcbiAga25vYi5pbml0KCk7XG5cbiAgJGhlYWRlciA9ICQoJy5oZWFkZXInKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkaGVhZGVyLnRvZ2dsZUNsYXNzKCdmaXhlZCcsICQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMCk7XG5cbiAgICB2YXIgJG15RWxlbSA9ICQoJyNwcm9ibGVtcycpO1xuICAgIGlmKCgoJCh0aGlzKS5zY3JvbGxUb3AoKSkgPj0gJG15RWxlbS5vZmZzZXQoKS50b3ApICYmICghJG15RWxlbS5oYXNDbGFzcygnYW5pbWF0aW5nJykpKSB7XG4gICAgICAkbXlFbGVtLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRTaW5lXCIsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICRteUVsZW0ucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgfSwgNTAwMCk7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3dSZXNpemUoKTtcbn1cbiJdfQ==
