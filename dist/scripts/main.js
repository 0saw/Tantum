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
  $('.welcome').height($(girlsContainer).height() - 100);
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
      floraImg.src = '/images/flora.png';
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
// $clock.knob(knobOptions);

     


window.addEventListener('scroll', function () {
  var $myElem = $('#problems');
  if(($(this).scrollTop() + $(this).height()) >= $myElem.offset().top) {
    $({animatedVal: knob.max}).animate({animatedVal: knob.min}, {
      duration: 2000,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG5cbmNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpO1xuIiwidmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG52YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbnZhciBnaXJsc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsc0NvbnRhaW5lcicpO1xudmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG52YXIgJGNsb2NrID0gJChcIi5jbG9ja1wiKTtcbnZhciBtYyA9IG5ldyBIYW1tZXIoaGFuZGxlKTtcbnZhciBnaXJsc0luZm8gPSB7XG4gIHg6IDBcbn07XG5cbnZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAkKCcud2VsY29tZScpLmhlaWdodCgkKGdpcmxzQ29udGFpbmVyKS5oZWlnaHQoKSAtIDEwMCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xufTtcbiQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxubWMuZ2V0KCdwYW4nKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCB9KTtcblxubWMub24oXCJwYW5tb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgZ2lybHNJbmZvLnggPSBlLmRlbHRhWDtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG59KS5vbigncGFuc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgaWYgKCRoYW5kbGUuaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gICRoYW5kbGUuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbn0pLm9uKCdwYW5lbmQnLCBmdW5jdGlvbigpIHtcbiAgJGhhbmRsZS5yZW1vdmVDbGFzcygncGFubmluZycpLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcbiAgJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgIGR1cmF0aW9uOiA2MDAsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZScsXG4gICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgICAgZ2lybHNJbmZvLnggPSB0aGlzLmFuaW1WYWw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICRoYW5kbGUucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsICcgKyAxNSAqIE1hdGguc2luKGdpcmxzSW5mby54IC8gZ2lybHNJbmZvLndpZHRoKSArICdkZWcpJyk7XG4gIGdpcmwuc3R5bGUubGVmdCA9IGdpcmxzSW5mby53aWR0aCAvIDIgKyBnaXJsc0luZm8ueCArICdweCc7XG59O1xuXG5cbnZhciBrbm9iID0ge1xuICBtaW46IDAsXG4gIG1heDogMjAsXG4gIHZhbHVlOiAyMCxcbiAgd2lkdGg6IDI4MCxcbiAgaGVpZ2h0OiAyODAsXG4gIFBJMjogTWF0aC5QSSAvIDIsXG4gIGVsZW06IG51bGwsXG4gIGN0eDogbnVsbCxcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAga25vYi5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1zQ2xvY2snKTtcbiAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICB9LFxuICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICBpZiAoa25vYi5mbG9yYVBhdHRlcm4gPT0gbnVsbCkge1xuICAgICAgdmFyIGZsb3JhSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBmbG9yYUltZy5zcmMgPSAnL2ltYWdlcy9mbG9yYS5wbmcnO1xuICAgICAgZmxvcmFJbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkY2xvY2sudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICAgIGtub2IuZmxvcmFQYXR0ZXJuID0ga25vYi5jdHguY3JlYXRlUGF0dGVybihmbG9yYUltZywgXCJyZXBlYXRcIik7XG4gICAgfVxuICAgIGtub2IuY3R4LmNsZWFyUmVjdCgwLCAwLCBrbm9iLndpZHRoLCBrbm9iLmhlaWdodCk7XG4gICAga25vYi5jdHguZmlsbFN0eWxlID0ga25vYi5mbG9yYVBhdHRlcm47XG4gICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAga25vYi5jdHgubW92ZVRvKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMik7XG4gICAga25vYi5jdHguYXJjKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIC1rbm9iLlBJMiwgLWtub2IuUEkyICsga25vYi52YWx1ZSAqIE1hdGguUEkgKiAyIC8ga25vYi5tYXgsIGZhbHNlKTtcbiAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICBrbm9iLmN0eC5maWxsKCk7XG4gIH1cbn07XG5rbm9iLmluaXQoKTtcbi8vICRjbG9jay5rbm9iKGtub2JPcHRpb25zKTtcblxuICAgICBcblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICB2YXIgJG15RWxlbSA9ICQoJyNwcm9ibGVtcycpO1xuICBpZigoJCh0aGlzKS5zY3JvbGxUb3AoKSArICQodGhpcykuaGVpZ2h0KCkpID49ICRteUVsZW0ub2Zmc2V0KCkudG9wKSB7XG4gICAgJCh7YW5pbWF0ZWRWYWw6IGtub2IubWF4fSkuYW5pbWF0ZSh7YW5pbWF0ZWRWYWw6IGtub2IubWlufSwge1xuICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICBlYXNpbmc6IFwiZWFzZUluT3V0U2luZVwiLFxuICAgICAgc3RlcDogZnVuY3Rpb24oKSB7IFxuICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICB9XG4gICAgfSk7IFxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXJndW1lbnRzLmNhbGxlZSk7XG4gIH1cbn0pO1xuXG5cblxud2luZG93UmVzaXplKCk7XG4iXX0=
