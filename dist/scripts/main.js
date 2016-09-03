(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js":[function(require,module,exports){
var lala = require('./views/front-page');


console.log('Hello World');

},{"./views/front-page":"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js"}],"C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\views\\front-page.js":[function(require,module,exports){
var handle = document.getElementById('welcomeHandle');
var girl = document.getElementById('girlAfter');
var girlsContainer = document.getElementById('girlsContainer');
var $handle = $(handle);
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

$('.clock').knob();


windowResize();

},{}]},{},["C:\\Users\\iamle\\Documents\\Work\\_inprogress\\tantum\\responsive-1\\Tantum\\src\\scripts\\main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbGFsYSA9IHJlcXVpcmUoJy4vdmlld3MvZnJvbnQtcGFnZScpO1xuXG5cbmNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpO1xuIiwidmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG52YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbnZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xudmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG52YXIgbWMgPSBuZXcgSGFtbWVyKGhhbmRsZSk7XG52YXIgZ2lybHNJbmZvID0ge1xuICB4OiAwXG59O1xuXG52YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICBnaXJsc0luZm8ud2lkdGggPSBnaXJsc0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG59O1xuJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuXG5tYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG5tYy5vbihcInBhbm1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICBnaXJsc0luZm8ueCA9IGUuZGVsdGFYO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbn0pLm9uKCdwYW5zdGFydCcsIGZ1bmN0aW9uKCkge1xuICBpZiAoJGhhbmRsZS5oYXNDbGFzcygnYW5pbWF0aW5nJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgJGhhbmRsZS5hZGRDbGFzcygncGFubmluZycpO1xufSkub24oJ3BhbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAkaGFuZGxlLnJlbW92ZUNsYXNzKCdwYW5uaW5nJykuYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAkKHthbmltVmFsOiBnaXJsc0luZm8ueH0pLmFuaW1hdGUoe2FuaW1WYWw6IDB9LCB7XG4gICAgZHVyYXRpb246IDYwMCxcbiAgICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJyxcbiAgICBzdGVwOiBmdW5jdGlvbiAoKSB7XG4gICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgJGhhbmRsZS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG52YXIgcGFuID0gZnVuY3Rpb24gKCkge1xuICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgZ2lybC5zdHlsZS5sZWZ0ID0gZ2lybHNJbmZvLndpZHRoIC8gMiArIGdpcmxzSW5mby54ICsgJ3B4Jztcbn07XG5cbiQoJy5jbG9jaycpLmtub2IoKTtcblxuXG53aW5kb3dSZXNpemUoKTtcbiJdfQ==
