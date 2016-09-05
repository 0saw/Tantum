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
    if ($handle.hasClass('animating')) {
      return false;
    }
    $handle.addClass('panning');
  }).on('panend', function() {
    $handle.removeClass('panning').addClass('animating');
    $({animVal: girlsInfo.x}).animate({animVal: 0}, {
      duration: 600,
      easing: 'easeInOutSine',
      step: function () {
        girlsInfo.x = this.animVal;
        requestAnimationFrame(pan);
      },
      complete: function() {
        $handle.removeClass('animating');
      }
    });
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

  window.addEventListener('scroll', function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKGZ1bmN0aW9uKCkge1xuICB2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG59KTtcbiIsInZhciBpbWFnZXNTZWxlY3RvciA9IFtcbiAgXCIuZ2lybHMgaW1nXCIsXG4gIFwiLndlbGNvbWVfX2xvZ28gaW1nXCIsXG4gIFwiLmdpcmxzX19oLWJnX3JpZ2h0XCIsXG4gIFwiI2Zsb3JhXCIsXG5dLmpvaW4oJywgJyk7XG5cbiQoaW1hZ2VzU2VsZWN0b3IpLmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSlcbiAgLmRvbmUoZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgfSlcbiAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgYWxlcnQoXCLQndC1INCy0YHQtSDQuNC30L7QsdGA0LDQttC10L3QuNGPINGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjC4g0JLQtdCxLdGB0YLRgNCw0L3QuNGG0LAg0LzQvtC20LXRgiDQstGL0LPQu9GP0LTQtdGC0Ywg0LjRgdC60LDQttC10L3QvdC+0LkuXCIpO1xuICB9KVxuICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ2ltYWdlc0xvYWRlZCcpO1xuICAgICQoJyNwcmVsb2FkZXInKS5mYWRlT3V0KHtcbiAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJ1xuICAgIH0pO1xuICAgIGZyb250UGFnZSgpO1xuICB9KTtcblxudmFyIGZyb250UGFnZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVIYW5kbGUnKTtcbiAgdmFyIGdpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybEFmdGVyJyk7XG4gIHZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xuICB2YXIgJGhhbmRsZSA9ICQoaGFuZGxlKTtcbiAgdmFyICRjbG9jayA9ICQoXCIuY2xvY2tcIik7XG4gIHZhciBtYyA9IG5ldyBIYW1tZXIoaGFuZGxlKTtcbiAgdmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbiAgdmFyIGdpcmxzSW5mbyA9IHtcbiAgICB4OiAwXG4gIH07XG5cbiAgdmFyIHdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBnaXJsc0luZm8ud2lkdGggPSBnaXJsc0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDk2MDtcbiAgICBpZiAobmV3UGFyYWxsYXggIT0gZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIGVuYWJsZVBhcmFsbGF4ID0gbmV3UGFyYWxsYXg7XG4gICAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgICAgcGFyYWxsYXgxLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYWxsYXgxLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH07XG4gICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxuICBtYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG4gIG1jLm9uKFwicGFubW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgZ2lybHNJbmZvLnggPSBlLmRlbHRhWDtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfSkub24oJ3BhbnN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCRoYW5kbGUuaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgICRoYW5kbGUuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbiAgfSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgICRoYW5kbGUucmVtb3ZlQ2xhc3MoJ3Bhbm5pbmcnKS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgICAgZHVyYXRpb246IDYwMCxcbiAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnLFxuICAgICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkaGFuZGxlLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgICBnaXJsLnN0eWxlLmxlZnQgPSBnaXJsc0luZm8ud2lkdGggLyAyICsgZ2lybHNJbmZvLnggKyAncHgnO1xuICB9O1xuXG4gIHZhciBzY2VuZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnNTY2VuZScpO1xuICB2YXIgcGFyYWxsYXgxID0gbmV3IFBhcmFsbGF4KHNjZW5lMSwge1xuICAgIGNhbGlicmF0ZVg6IHRydWUsXG4gICAgY2FsaWJyYXRlWTogdHJ1ZSxcbiAgICBpbnZlcnRYOiBmYWxzZSxcbiAgICBpbnZlcnRZOiBmYWxzZSxcbiAgICBsaW1pdFg6IGZhbHNlLFxuICAgIGxpbWl0WTogZmFsc2UsXG4gICAgc2NhbGFyWDogMixcbiAgICBzY2FsYXJZOiAyLFxuICAgIGZyaWN0aW9uWDogMC4zLFxuICAgIGZyaWN0aW9uWTogMC41LFxuICAgIG9yaWdpblg6IDAuNSxcbiAgICBvcmlnaW5ZOiAwLjVcbiAgfSk7XG5cbiAgdmFyIGtub2IgPSB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMjAsXG4gICAgdmFsdWU6IDIwLFxuICAgIHdpZHRoOiAyODAsXG4gICAgaGVpZ2h0OiAyODAsXG4gICAgUEkyOiBNYXRoLlBJIC8gMixcbiAgICBlbGVtOiBudWxsLFxuICAgIGN0eDogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGtub2IuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtc0Nsb2NrJyk7XG4gICAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAga25vYi5kcmF3KCk7XG4gICAgfSxcbiAgICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChrbm9iLmZsb3JhUGF0dGVybiA9PSBudWxsKSB7XG4gICAgICAgIHZhciBmbG9yYUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9yYScpO1xuICAgICAgICBrbm9iLmZsb3JhUGF0dGVybiA9IGtub2IuY3R4LmNyZWF0ZVBhdHRlcm4oZmxvcmFJbWcsIFwicmVwZWF0XCIpO1xuICAgICAgfVxuICAgICAga25vYi5jdHguY2xlYXJSZWN0KDAsIDAsIGtub2Iud2lkdGgsIGtub2IuaGVpZ2h0KTtcbiAgICAgIGtub2IuY3R4LmZpbGxTdHlsZSA9IGtub2IuZmxvcmFQYXR0ZXJuO1xuICAgICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBrbm9iLmN0eC5tb3ZlVG8oa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyKTtcbiAgICAgIGtub2IuY3R4LmFyYyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCAta25vYi5QSTIsIC1rbm9iLlBJMiArIGtub2IudmFsdWUgKiBNYXRoLlBJICogMiAvIGtub2IubWF4LCBmYWxzZSk7XG4gICAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG4gIGtub2IuaW5pdCgpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRteUVsZW0gPSAkKCcjcHJvYmxlbXMnKTtcbiAgICBpZigoJCh0aGlzKS5zY3JvbGxUb3AoKSkgPj0gJG15RWxlbS5vZmZzZXQoKS50b3ApIHtcbiAgICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRTaW5lXCIsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9XG4gICAgICB9KTsgXG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93UmVzaXplKCk7XG59XG4iXX0=
