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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBmcm9udFBhZ2UgPSByZXF1aXJlKCcuL3ZpZXdzL2Zyb250LXBhZ2UnKTtcblxuY29uc29sZS5sb2coJ0hlbGxvIFdvcmxkJyk7XG4iLCJ2YXIgaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVIYW5kbGUnKTtcbnZhciBnaXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxBZnRlcicpO1xudmFyIGdpcmxzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxzQ29udGFpbmVyJyk7XG52YXIgJGhhbmRsZSA9ICQoaGFuZGxlKTtcbnZhciAkY2xvY2sgPSAkKFwiLmNsb2NrXCIpO1xudmFyIG1jID0gbmV3IEhhbW1lcihoYW5kbGUpO1xudmFyIGdpcmxzSW5mbyA9IHtcbiAgeDogMFxufTtcblxudmFyIHdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgZ2lybHNJbmZvLndpZHRoID0gZ2lybHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xufTtcbiQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxubWMuZ2V0KCdwYW4nKS5zZXQoeyBkaXJlY3Rpb246IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCB9KTtcblxubWMub24oXCJwYW5tb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgZ2lybHNJbmZvLnggPSBlLmRlbHRhWDtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG59KS5vbigncGFuc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgaWYgKCRoYW5kbGUuaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gICRoYW5kbGUuYWRkQ2xhc3MoJ3Bhbm5pbmcnKTtcbn0pLm9uKCdwYW5lbmQnLCBmdW5jdGlvbigpIHtcbiAgJGhhbmRsZS5yZW1vdmVDbGFzcygncGFubmluZycpLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcbiAgJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgIGR1cmF0aW9uOiA2MDAsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZScsXG4gICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgICAgZ2lybHNJbmZvLnggPSB0aGlzLmFuaW1WYWw7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICRoYW5kbGUucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgIH1cbiAgfSk7XG59KTtcblxudmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsICcgKyAxNSAqIE1hdGguc2luKGdpcmxzSW5mby54IC8gZ2lybHNJbmZvLndpZHRoKSArICdkZWcpJyk7XG4gIGdpcmwuc3R5bGUubGVmdCA9IGdpcmxzSW5mby53aWR0aCAvIDIgKyBnaXJsc0luZm8ueCArICdweCc7XG59O1xuXG5cbnZhciBrbm9iID0ge1xuICBtaW46IDAsXG4gIG1heDogMjAsXG4gIHZhbHVlOiAyMCxcbiAgd2lkdGg6IDI4MCxcbiAgaGVpZ2h0OiAyODAsXG4gIFBJMjogTWF0aC5QSSAvIDIsXG4gIGVsZW06IG51bGwsXG4gIGN0eDogbnVsbCxcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAga25vYi5lbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2JsZW1zQ2xvY2snKTtcbiAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGtub2IuZHJhdygpO1xuICB9LFxuICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICBpZiAoa25vYi5mbG9yYVBhdHRlcm4gPT0gbnVsbCkge1xuICAgICAgdmFyIGZsb3JhSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBmbG9yYUltZy5zcmMgPSAnaW1hZ2VzL2Zsb3JhLnBuZyc7XG4gICAgICBmbG9yYUltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRjbG9jay50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgICAga25vYi5mbG9yYVBhdHRlcm4gPSBrbm9iLmN0eC5jcmVhdGVQYXR0ZXJuKGZsb3JhSW1nLCBcInJlcGVhdFwiKTtcbiAgICB9XG4gICAga25vYi5jdHguY2xlYXJSZWN0KDAsIDAsIGtub2Iud2lkdGgsIGtub2IuaGVpZ2h0KTtcbiAgICBrbm9iLmN0eC5maWxsU3R5bGUgPSBrbm9iLmZsb3JhUGF0dGVybjtcbiAgICBrbm9iLmN0eC5iZWdpblBhdGgoKTtcbiAgICBrbm9iLmN0eC5tb3ZlVG8oa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyKTtcbiAgICBrbm9iLmN0eC5hcmMoa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwgLWtub2IuUEkyLCAta25vYi5QSTIgKyBrbm9iLnZhbHVlICogTWF0aC5QSSAqIDIgLyBrbm9iLm1heCwgZmFsc2UpO1xuICAgIGtub2IuY3R4LmNsb3NlUGF0aCgpO1xuICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgfVxufTtcbmtub2IuaW5pdCgpO1xuXG4gICAgIFxudmFyIHNjZW5lMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduc1NjZW5lJyk7XG52YXIgcGFyYWxsYXgxID0gbmV3IFBhcmFsbGF4KHNjZW5lMSwge1xuICBjYWxpYnJhdGVYOiB0cnVlLFxuICBjYWxpYnJhdGVZOiB0cnVlLFxuICBpbnZlcnRYOiBmYWxzZSxcbiAgaW52ZXJ0WTogZmFsc2UsXG4gIGxpbWl0WDogZmFsc2UsXG4gIGxpbWl0WTogZmFsc2UsXG4gIHNjYWxhclg6IDIsXG4gIHNjYWxhclk6IDIsXG4gIGZyaWN0aW9uWDogMC4zLFxuICBmcmljdGlvblk6IDAuNSxcbiAgb3JpZ2luWDogMC41LFxuICBvcmlnaW5ZOiAwLjVcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICB2YXIgJG15RWxlbSA9ICQoJyNwcm9ibGVtcycpO1xuICBpZigoJCh0aGlzKS5zY3JvbGxUb3AoKSkgPj0gJG15RWxlbS5vZmZzZXQoKS50b3ApIHtcbiAgICAkKHthbmltYXRlZFZhbDoga25vYi5tYXh9KS5hbmltYXRlKHthbmltYXRlZFZhbDoga25vYi5taW59LCB7XG4gICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIGVhc2luZzogXCJlYXNlSW5PdXRTaW5lXCIsXG4gICAgICBzdGVwOiBmdW5jdGlvbigpIHsgXG4gICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgIH1cbiAgICB9KTsgXG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgfVxufSk7XG5cblxuXG53aW5kb3dSZXNpemUoKTtcbiJdfQ==
