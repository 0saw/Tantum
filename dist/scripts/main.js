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
    girlsInfo.x = e.deltaX;
    requestAnimationFrame(pan);
  }).on('panstart', function() {
    $(document.body).addClass('panning');
  }).on('panend', function() {
    $(document.body).removeClass('panning');
    girlsInfo.x = 0;
    requestAnimationFrame(pan);
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
    $handle.css('transform', 'translate3d(' + girlsInfo.x + 'px, 0, 0) rotate3d(0, 1, 0, ' + 15 * Math.sin(girlsInfo.x / girlsInfo.width) + 'deg)');
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

  document.getElementById('container').addEventListener('scroll', function () {
    var $myElem = $('#problems');
    if(($(this).scrollTop()) >= $myElem.offset().top) {
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
      this.removeEventListener('scroll', arguments.callee);
    }
  });

  windowResize();
}

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcbiAgdmFyIGZyb250UGFnZSA9IHJlcXVpcmUoJy4vdmlld3MvZnJvbnQtcGFnZScpO1xufSk7XG4iLCJ2YXIgaW1hZ2VzU2VsZWN0b3IgPSBbXG4gIFwiLmdpcmxzIGltZ1wiLFxuICBcIi53ZWxjb21lX19sb2dvIGltZ1wiLFxuICBcIi5naXJsc19faC1iZ19yaWdodFwiLFxuICBcIiNmbG9yYVwiLFxuXS5qb2luKCcsICcpO1xuXG4kKGltYWdlc1NlbGVjdG9yKS5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0pXG4gIC5kb25lKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIH0pXG4gIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIGFsZXJ0KFwi0J3QtSDQstGB0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDRg9C00LDQu9C+0YHRjCDQt9Cw0LPRgNGD0LfQuNGC0YwuINCS0LXQsS3RgdGC0YDQsNC90LjRhtCwINC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMINC40YHQutCw0LbQtdC90L3QvtC5LlwiKTtcbiAgfSlcbiAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdpbWFnZXNMb2FkZWQnKTtcbiAgICAkKCcjcHJlbG9hZGVyJykuZmFkZU91dCh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZSdcbiAgICB9KTtcbiAgICBmcm9udFBhZ2UoKTtcbiAgfSk7XG5cbnZhciBmcm9udFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG4gIHZhciBnaXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxBZnRlcicpO1xuICB2YXIgZ2lybHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybHNDb250YWluZXInKTtcbiAgdmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG4gIHZhciAkY2xvY2sgPSAkKFwiLmNsb2NrXCIpO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKGhhbmRsZSk7XG4gIHZhciBlbmFibGVQYXJhbGxheCA9IG51bGw7XG4gIHZhciBnaXJsc0luZm8gPSB7XG4gICAgeDogMFxuICB9O1xuXG4gIHZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ2lybHNJbmZvLndpZHRoID0gZ2lybHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgdmFyIG5ld1BhcmFsbGF4ID0gJCh3aW5kb3cpLndpZHRoKCkgPiA5NjA7XG4gICAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICBlbmFibGVQYXJhbGxheCA9IG5ld1BhcmFsbGF4O1xuICAgICAgaWYgKGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgICAgIHBhcmFsbGF4MS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFsbGF4MS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICB9O1xuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbiAgbWMuZ2V0KCdwYW4nKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCB9KTtcblxuICBtYy5vbihcInBhbm1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgIGdpcmxzSW5mby54ID0gZS5kZWx0YVg7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH0pLm9uKCdwYW5zdGFydCcsIGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgICBnaXJsc0luZm8ueCA9IDA7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgLy8gJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgIC8vICAgZHVyYXRpb246IDYwMCxcbiAgICAvLyAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnLFxuICAgIC8vICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAvLyAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgLy8gICB9LFxuICAgIC8vICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfSk7XG5cbiAgdmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgICBnaXJsLnN0eWxlLmxlZnQgPSBnaXJsc0luZm8ud2lkdGggLyAyICsgZ2lybHNJbmZvLnggKyAncHgnO1xuICB9O1xuXG4gIHZhciBzY2VuZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnNTY2VuZScpO1xuICB2YXIgcGFyYWxsYXgxID0gbmV3IFBhcmFsbGF4KHNjZW5lMSwge1xuICAgIGNhbGlicmF0ZVg6IHRydWUsXG4gICAgY2FsaWJyYXRlWTogdHJ1ZSxcbiAgICBpbnZlcnRYOiBmYWxzZSxcbiAgICBpbnZlcnRZOiBmYWxzZSxcbiAgICBsaW1pdFg6IGZhbHNlLFxuICAgIGxpbWl0WTogZmFsc2UsXG4gICAgc2NhbGFyWDogMixcbiAgICBzY2FsYXJZOiAyLFxuICAgIGZyaWN0aW9uWDogMC4zLFxuICAgIGZyaWN0aW9uWTogMC41LFxuICAgIG9yaWdpblg6IDAuNSxcbiAgICBvcmlnaW5ZOiAwLjVcbiAgfSk7XG5cbiAgdmFyIGtub2IgPSB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMjAsXG4gICAgdmFsdWU6IDIwLFxuICAgIHdpZHRoOiAyODAsXG4gICAgaGVpZ2h0OiAyODAsXG4gICAgUEkyOiBNYXRoLlBJIC8gMixcbiAgICBlbGVtOiBudWxsLFxuICAgIGN0eDogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGtub2IuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtc0Nsb2NrJyk7XG4gICAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAga25vYi5kcmF3KCk7XG4gICAgfSxcbiAgICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChrbm9iLmZsb3JhUGF0dGVybiA9PSBudWxsKSB7XG4gICAgICAgIHZhciBmbG9yYUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9yYScpO1xuICAgICAgICBrbm9iLmZsb3JhUGF0dGVybiA9IGtub2IuY3R4LmNyZWF0ZVBhdHRlcm4oZmxvcmFJbWcsIFwicmVwZWF0XCIpO1xuICAgICAgfVxuICAgICAga25vYi5jdHguY2xlYXJSZWN0KDAsIDAsIGtub2Iud2lkdGgsIGtub2IuaGVpZ2h0KTtcbiAgICAgIGtub2IuY3R4LmZpbGxTdHlsZSA9IGtub2IuZmxvcmFQYXR0ZXJuO1xuICAgICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBrbm9iLmN0eC5tb3ZlVG8oa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyKTtcbiAgICAgIGtub2IuY3R4LmFyYyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCAta25vYi5QSTIsIC1rbm9iLlBJMiArIGtub2IudmFsdWUgKiBNYXRoLlBJICogMiAvIGtub2IubWF4LCBmYWxzZSk7XG4gICAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG4gIGtub2IuaW5pdCgpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRteUVsZW0gPSAkKCcjcHJvYmxlbXMnKTtcbiAgICBpZigoJCh0aGlzKS5zY3JvbGxUb3AoKSkgPj0gJG15RWxlbS5vZmZzZXQoKS50b3ApIHtcbiAgICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRTaW5lXCIsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9XG4gICAgICB9KTsgXG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93UmVzaXplKCk7XG59XG4iXX0=
