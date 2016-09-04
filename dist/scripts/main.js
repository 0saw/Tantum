(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js":[function(require,module,exports){
var frontPage = require('./views/front-page');

console.log('Hello World');

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
var handle = document.getElementById('welcomeHandle');
var girl = document.getElementById('girlAfter');
var girlsContainer = document.getElementById('girlsContainer');
var $handle = $(handle);
var $clock = $(".clock");
var mc = new Hammer(handle);
var girlsInfo = {
  x: 0
};

var windowResize = function () {
  girlsInfo.width = girlsContainer.offsetWidth;
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
  if(($(this).scrollTop() + $(this).height()) >= $myElem.offset().top) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG5cbmNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpO1xuIiwidmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG52YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbnZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xudmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG52YXIgJGNsb2NrID0gJChcIi5jbG9ja1wiKTtcbnZhciBtYyA9IG5ldyBIYW1tZXIoaGFuZGxlKTtcbnZhciBnaXJsc0luZm8gPSB7XG4gIHg6IDBcbn07XG5cbnZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbn07XG4kKHdpbmRvdykub24oJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSk7XG5cbm1jLmdldCgncGFuJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwgfSk7XG5cbm1jLm9uKFwicGFubW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gIGdpcmxzSW5mby54ID0gZS5kZWx0YVg7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xufSkub24oJ3BhbnN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gIGlmICgkaGFuZGxlLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAkaGFuZGxlLmFkZENsYXNzKCdwYW5uaW5nJyk7XG59KS5vbigncGFuZW5kJywgZnVuY3Rpb24oKSB7XG4gICRoYW5kbGUucmVtb3ZlQ2xhc3MoJ3Bhbm5pbmcnKS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG4gICQoe2FuaW1WYWw6IGdpcmxzSW5mby54fSkuYW5pbWF0ZSh7YW5pbVZhbDogMH0sIHtcbiAgICBkdXJhdGlvbjogNjAwLFxuICAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnLFxuICAgIHN0ZXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGdpcmxzSW5mby54ID0gdGhpcy5hbmltVmFsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAkaGFuZGxlLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnZhciBwYW4gPSBmdW5jdGlvbiAoKSB7XG4gICRoYW5kbGUuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlM2QoJyArIGdpcmxzSW5mby54ICsgJ3B4LCAwLCAwKSByb3RhdGUzZCgwLCAxLCAwLCAnICsgMTUgKiBNYXRoLnNpbihnaXJsc0luZm8ueCAvIGdpcmxzSW5mby53aWR0aCkgKyAnZGVnKScpO1xuICBnaXJsLnN0eWxlLmxlZnQgPSBnaXJsc0luZm8ud2lkdGggLyAyICsgZ2lybHNJbmZvLnggKyAncHgnO1xufTtcblxuXG52YXIga25vYiA9IHtcbiAgbWluOiAwLFxuICBtYXg6IDIwLFxuICB2YWx1ZTogMjAsXG4gIHdpZHRoOiAyODAsXG4gIGhlaWdodDogMjgwLFxuICBQSTI6IE1hdGguUEkgLyAyLFxuICBlbGVtOiBudWxsLFxuICBjdHg6IG51bGwsXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgIGtub2IuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtc0Nsb2NrJyk7XG4gICAga25vYi5jdHggPSBrbm9iLmVsZW0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgfSxcbiAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKGtub2IuZmxvcmFQYXR0ZXJuID09IG51bGwpIHtcbiAgICAgIHZhciBmbG9yYUltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgZmxvcmFJbWcuc3JjID0gJ2ltYWdlcy9mbG9yYS5wbmcnO1xuICAgICAgZmxvcmFJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkY2xvY2sudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICAgIGtub2IuZmxvcmFQYXR0ZXJuID0ga25vYi5jdHguY3JlYXRlUGF0dGVybihmbG9yYUltZywgXCJyZXBlYXRcIik7XG4gICAgfVxuICAgIGtub2IuY3R4LmNsZWFyUmVjdCgwLCAwLCBrbm9iLndpZHRoLCBrbm9iLmhlaWdodCk7XG4gICAga25vYi5jdHguZmlsbFN0eWxlID0ga25vYi5mbG9yYVBhdHRlcm47XG4gICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAga25vYi5jdHgubW92ZVRvKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMik7XG4gICAga25vYi5jdHguYXJjKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIC1rbm9iLlBJMiwgLWtub2IuUEkyICsga25vYi52YWx1ZSAqIE1hdGguUEkgKiAyIC8ga25vYi5tYXgsIGZhbHNlKTtcbiAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICBrbm9iLmN0eC5maWxsKCk7XG4gIH1cbn07XG5rbm9iLmluaXQoKTtcblxuICAgICBcbnZhciBzY2VuZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnNTY2VuZScpO1xudmFyIHBhcmFsbGF4MSA9IG5ldyBQYXJhbGxheChzY2VuZTEsIHtcbiAgY2FsaWJyYXRlWDogdHJ1ZSxcbiAgY2FsaWJyYXRlWTogdHJ1ZSxcbiAgaW52ZXJ0WDogZmFsc2UsXG4gIGludmVydFk6IGZhbHNlLFxuICBsaW1pdFg6IGZhbHNlLFxuICBsaW1pdFk6IGZhbHNlLFxuICBzY2FsYXJYOiAyLFxuICBzY2FsYXJZOiAyLFxuICBmcmljdGlvblg6IDAuMyxcbiAgZnJpY3Rpb25ZOiAwLjUsXG4gIG9yaWdpblg6IDAuNSxcbiAgb3JpZ2luWTogMC41XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgdmFyICRteUVsZW0gPSAkKCcjcHJvYmxlbXMnKTtcbiAgaWYoKCQodGhpcykuc2Nyb2xsVG9wKCkgKyAkKHRoaXMpLmhlaWdodCgpKSA+PSAkbXlFbGVtLm9mZnNldCgpLnRvcCkge1xuICAgICQoe2FuaW1hdGVkVmFsOiBrbm9iLm1heH0pLmFuaW1hdGUoe2FuaW1hdGVkVmFsOiBrbm9iLm1pbn0sIHtcbiAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFNpbmVcIixcbiAgICAgIHN0ZXA6IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgfVxuICAgIH0pOyBcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICB9XG59KTtcblxuXG5cbndpbmRvd1Jlc2l6ZSgpO1xuIl19
