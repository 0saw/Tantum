(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js":[function(require,module,exports){
var frontPage = require('./views/front-page');

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
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
      var floraImg = new Image();
      floraImg.src = 'images/flora.png';
      floraImg.addEventListener("load", function () {
        $clock.trigger("change");
      }, false);
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

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG4iLCJ2YXIgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVIYW5kbGUnKTtcbnZhciBnaXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxBZnRlcicpO1xudmFyIGdpcmxzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxzQ29udGFpbmVyJyk7XG52YXIgJGhhbmRsZSA9ICQoaGFuZGxlKTtcbnZhciAkY2xvY2sgPSAkKFwiLmNsb2NrXCIpO1xudmFyIG1jID0gbmV3IEhhbW1lcihoYW5kbGUpO1xudmFyIGVuYWJsZVBhcmFsbGF4ID0gbnVsbDtcbnZhciBnaXJsc0luZm8gPSB7XG4gIHg6IDBcbn07XG5cbnZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDk2MDtcbiAgaWYgKG5ld1BhcmFsbGF4ICE9IGVuYWJsZVBhcmFsbGF4KSB7XG4gICAgZW5hYmxlUGFyYWxsYXggPSBuZXdQYXJhbGxheDtcbiAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIHBhcmFsbGF4MS5lbmFibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyYWxsYXgxLmRpc2FibGUoKTtcbiAgICB9XG4gIH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG59O1xuJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuXG5tYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG5tYy5vbihcInBhbm1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICBnaXJsc0luZm8ueCA9IGUuZGVsdGFYO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbn0pLm9uKCdwYW5zdGFydCcsIGZ1bmN0aW9uKCkge1xuICBpZiAoJGhhbmRsZS5oYXNDbGFzcygnYW5pbWF0aW5nJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgJGhhbmRsZS5hZGRDbGFzcygncGFubmluZycpO1xufSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAkaGFuZGxlLnJlbW92ZUNsYXNzKCdwYW5uaW5nJykuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAkKHthbmltVmFsOiBnaXJsc0luZm8ueH0pLmFuaW1hdGUoe2FuaW1WYWw6IDB9LCB7XG4gICAgZHVyYXRpb246IDYwMCxcbiAgICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJyxcbiAgICBzdGVwOiBmdW5jdGlvbiAoKSB7XG4gICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgJGhhbmRsZS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgcGFuID0gZnVuY3Rpb24gKCkge1xuICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgZ2lybC5zdHlsZS5sZWZ0ID0gZ2lybHNJbmZvLndpZHRoIC8gMiArIGdpcmxzSW5mby54ICsgJ3B4Jztcbn07XG5cblxudmFyIGtub2IgPSB7XG4gIG1pbjogMCxcbiAgbWF4OiAyMCxcbiAgdmFsdWU6IDIwLFxuICB3aWR0aDogMjgwLFxuICBoZWlnaHQ6IDI4MCxcbiAgUEkyOiBNYXRoLlBJIC8gMixcbiAgZWxlbTogbnVsbCxcbiAgY3R4OiBudWxsLFxuICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICBrbm9iLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbXNDbG9jaycpO1xuICAgIGtub2IuY3R4ID0ga25vYi5lbGVtLmdldENvbnRleHQoJzJkJyk7XG4gICAga25vYi5kcmF3KCk7XG4gIH0sXG4gIGRyYXc6IGZ1bmN0aW9uKCkge1xuICAgIGlmIChrbm9iLmZsb3JhUGF0dGVybiA9PSBudWxsKSB7XG4gICAgICB2YXIgZmxvcmFJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGZsb3JhSW1nLnNyYyA9ICdpbWFnZXMvZmxvcmEucG5nJztcbiAgICAgIGZsb3JhSW1nLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGNsb2NrLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgICBrbm9iLmZsb3JhUGF0dGVybiA9IGtub2IuY3R4LmNyZWF0ZVBhdHRlcm4oZmxvcmFJbWcsIFwicmVwZWF0XCIpO1xuICAgIH1cbiAgICBrbm9iLmN0eC5jbGVhclJlY3QoMCwgMCwga25vYi53aWR0aCwga25vYi5oZWlnaHQpO1xuICAgIGtub2IuY3R4LmZpbGxTdHlsZSA9IGtub2IuZmxvcmFQYXR0ZXJuO1xuICAgIGtub2IuY3R4LmJlZ2luUGF0aCgpO1xuICAgIGtub2IuY3R4Lm1vdmVUbyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIpO1xuICAgIGtub2IuY3R4LmFyYyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCAta25vYi5QSTIsIC1rbm9iLlBJMiArIGtub2IudmFsdWUgKiBNYXRoLlBJICogMiAvIGtub2IubWF4LCBmYWxzZSk7XG4gICAga25vYi5jdHguY2xvc2VQYXRoKCk7XG4gICAga25vYi5jdHguZmlsbCgpO1xuICB9XG59O1xua25vYi5pbml0KCk7XG5cbiAgICAgXG52YXIgc2NlbmUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25zU2NlbmUnKTtcbnZhciBwYXJhbGxheDEgPSBuZXcgUGFyYWxsYXgoc2NlbmUxLCB7XG4gIGNhbGlicmF0ZVg6IHRydWUsXG4gIGNhbGlicmF0ZVk6IHRydWUsXG4gIGludmVydFg6IGZhbHNlLFxuICBpbnZlcnRZOiBmYWxzZSxcbiAgbGltaXRYOiBmYWxzZSxcbiAgbGltaXRZOiBmYWxzZSxcbiAgc2NhbGFyWDogMixcbiAgc2NhbGFyWTogMixcbiAgZnJpY3Rpb25YOiAwLjMsXG4gIGZyaWN0aW9uWTogMC41LFxuICBvcmlnaW5YOiAwLjUsXG4gIG9yaWdpblk6IDAuNVxufSk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciAkbXlFbGVtID0gJCgnI3Byb2JsZW1zJyk7XG4gIGlmKCgkKHRoaXMpLnNjcm9sbFRvcCgpKSA+PSAkbXlFbGVtLm9mZnNldCgpLnRvcCkge1xuICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFNpbmVcIixcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgfVxuICAgIH0pOyBcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICB9XG59KTtcblxuXG5cbndpbmRvd1Jlc2l6ZSgpO1xuIl19
