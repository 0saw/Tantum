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
      knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, -knob.PI2, -knob.PI2 + (knob.PI2 + knob.PI2 / 3) * (knob.value / knob.max), false);
      // knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, 0, (knob.PI2 + knob.PI2 / 3) * (knob.value / knob.max), false);
      console.log(knob.value / knob.max)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZnVuY3Rpb24oKSB7XG4gIHZhciBmcm9udFBhZ2UgPSByZXF1aXJlKCcuL3ZpZXdzL2Zyb250LXBhZ2UnKTtcbn0pO1xuIiwidmFyIGltYWdlc1NlbGVjdG9yID0gW1xuICBcIi5naXJscyBpbWdcIixcbiAgXCIud2VsY29tZV9fbG9nbyBpbWdcIixcbiAgXCIuZ2lybHNfX2gtYmdfcmlnaHRcIixcbiAgXCIjZmxvcmFcIixcbl0uam9pbignLCAnKTtcblxudmFyIHNjcm9sbFRvRWxlbWVudHMgPSBbXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YwJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjEnXVwiLCBvZmZzZXQ6IDIwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMiddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YzJ11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjQnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNSddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y2J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjcnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmOCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Zvb3RlciddXCIsIG9mZnNldDogMTAwIH1cbl07XG5cbnZhciBzY3JvbGxUb3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzY3JvbGxUb0VsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgb2Zmc2V0KSB7XG4gICAgJChlbGVtZW50KS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBlbGVtZW50Q2xpY2sgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgdmFyIGRlc3RpbmF0aW9uICA9ICQoZWxlbWVudENsaWNrKVswXS5vZmZzZXRUb3A7XG4gICAgICBpZihkZXN0aW5hdGlvbiA8IDApIHsgZGVzdGluYXRpb24gPSAwOyB9XG4gICAgICBjb25zb2xlLmxvZygkKGVsZW1lbnRDbGljayksICQoZWxlbWVudENsaWNrKVswXS5vZmZzZXRUb3ApO1xuICAgICAgJCgnI2NvbnRhaW5lcicpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IGRlc3RpbmF0aW9uIC0gb2Zmc2V0IH0sIFwic2xvd1wiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2Nyb2xsVG9FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHNjcm9sbFRvRWxlbWVudChzY3JvbGxUb0VsZW1lbnRzW2ldLnNlbCwgc2Nyb2xsVG9FbGVtZW50c1tpXS5vZmZzZXQpO1xuICB9XG59O1xuXG4kKGltYWdlc1NlbGVjdG9yKS5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0pXG4gIC5kb25lKGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIH0pXG4gIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgIGFsZXJ0KFwi0J3QtSDQstGB0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDRg9C00LDQu9C+0YHRjCDQt9Cw0LPRgNGD0LfQuNGC0YwuINCS0LXQsS3RgdGC0YDQsNC90LjRhtCwINC80L7QttC10YIg0LLRi9Cz0LvRj9C00LXRgtGMINC40YHQutCw0LbQtdC90L3QvtC5LlwiKTtcbiAgfSlcbiAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdpbWFnZXNMb2FkZWQnKTtcbiAgICAkKCcjcHJlbG9hZGVyJykuZmFkZU91dCh7XG4gICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluT3V0U2luZSdcbiAgICB9KTtcbiAgICBmcm9udFBhZ2UoKTtcbiAgICBzY3JvbGxUb3MoKTtcbiAgfSk7XG5cbnZhciBmcm9udFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhhbmRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lSGFuZGxlJyk7XG4gIHZhciBnaXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxBZnRlcicpO1xuICB2YXIgZ2lybHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2lybHNDb250YWluZXInKTtcbiAgdmFyICRoYW5kbGUgPSAkKGhhbmRsZSk7XG4gIHZhciAkY2xvY2sgPSAkKFwiLmNsb2NrXCIpO1xuICB2YXIgbWMgPSBuZXcgSGFtbWVyKGhhbmRsZSk7XG4gIHZhciBlbmFibGVQYXJhbGxheCA9IG51bGw7XG4gIHZhciBnaXJsc0luZm8gPSB7XG4gICAgeDogMFxuICB9O1xuXG4gIHZhciB3aW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZ2lybHNJbmZvLndpZHRoID0gZ2lybHNDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgZ2lybHNJbmZvLnggPSAwO1xuICAgIHZhciBuZXdQYXJhbGxheCA9ICQod2luZG93KS53aWR0aCgpID4gOTYwO1xuICAgIGlmIChuZXdQYXJhbGxheCAhPSBlbmFibGVQYXJhbGxheCkge1xuICAgICAgZW5hYmxlUGFyYWxsYXggPSBuZXdQYXJhbGxheDtcbiAgICAgIGlmIChlbmFibGVQYXJhbGxheCkge1xuICAgICAgICBwYXJhbGxheDEuZW5hYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbGxheDEuZGlzYWJsZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfTtcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCB3aW5kb3dSZXNpemUpO1xuXG4gIG1jLmdldCgncGFuJykuc2V0KHsgZGlyZWN0aW9uOiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwgfSk7XG5cbiAgbWMub24oXCJwYW5tb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBnaXJsc0luZm8ueCA9IE1hdGgubWF4KE1hdGgubWluKGdpcmxzSW5mby54T3JpZyArIGUuZGVsdGFYLCBnaXJsc0luZm8ud2lkdGggLyAyKSwgLWdpcmxzSW5mby53aWR0aCAvIDIpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICB9KS5vbigncGFuc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICBnaXJsc0luZm8ueE9yaWcgPSBnaXJsc0luZm8ueDtcbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCdwYW5uaW5nJyk7XG4gIH0pLm9uKCdwYW5lbmQnLCBmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKCdwYW5uaW5nJyk7XG4gICAgLy8gZ2lybHNJbmZvLnggPSAwO1xuICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuXG4gICAgLy8gJCh7YW5pbVZhbDogZ2lybHNJbmZvLnh9KS5hbmltYXRlKHthbmltVmFsOiAwfSwge1xuICAgIC8vICAgZHVyYXRpb246IDYwMCxcbiAgICAvLyAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnLFxuICAgIC8vICAgc3RlcDogZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBnaXJsc0luZm8ueCA9IHRoaXMuYW5pbVZhbDtcbiAgICAvLyAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gICAgLy8gICB9LFxuICAgIC8vICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfSk7XG5cbiAgdmFyIHBhbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCkgcm90YXRlM2QoMCwgMSwgMCwgJyArIDE1ICogTWF0aC5zaW4oZ2lybHNJbmZvLnggLyBnaXJsc0luZm8ud2lkdGgpICsgJ2RlZyknKTtcbiAgICAkaGFuZGxlLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZTNkKCcgKyBnaXJsc0luZm8ueCArICdweCwgMCwgMCknKTtcbiAgICBnaXJsLnN0eWxlLmxlZnQgPSBnaXJsc0luZm8ud2lkdGggLyAyICsgZ2lybHNJbmZvLnggKyAncHgnO1xuICB9O1xuXG4gIHZhciBzY2VuZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnNTY2VuZScpO1xuICB2YXIgcGFyYWxsYXgxID0gbmV3IFBhcmFsbGF4KHNjZW5lMSwge1xuICAgIGNhbGlicmF0ZVg6IHRydWUsXG4gICAgY2FsaWJyYXRlWTogdHJ1ZSxcbiAgICBpbnZlcnRYOiBmYWxzZSxcbiAgICBpbnZlcnRZOiBmYWxzZSxcbiAgICBsaW1pdFg6IGZhbHNlLFxuICAgIGxpbWl0WTogZmFsc2UsXG4gICAgc2NhbGFyWDogMixcbiAgICBzY2FsYXJZOiAyLFxuICAgIGZyaWN0aW9uWDogMC4zLFxuICAgIGZyaWN0aW9uWTogMC41LFxuICAgIG9yaWdpblg6IDAuNSxcbiAgICBvcmlnaW5ZOiAwLjVcbiAgfSk7XG5cbiAgdmFyIGtub2IgPSB7XG4gICAgbWluOiAwLFxuICAgIG1heDogMjAsXG4gICAgdmFsdWU6IDIwLFxuICAgIHdpZHRoOiAyODAsXG4gICAgaGVpZ2h0OiAyODAsXG4gICAgUEkyOiBNYXRoLlBJIC8gMixcbiAgICBlbGVtOiBudWxsLFxuICAgIGN0eDogbnVsbCxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGtub2IuZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ibGVtc0Nsb2NrJyk7XG4gICAgICBrbm9iLmN0eCA9IGtub2IuZWxlbS5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAga25vYi5kcmF3KCk7XG4gICAgfSxcbiAgICBkcmF3OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChrbm9iLmZsb3JhUGF0dGVybiA9PSBudWxsKSB7XG4gICAgICAgIHZhciBmbG9yYUltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmbG9yYScpO1xuICAgICAgICBrbm9iLmZsb3JhUGF0dGVybiA9IGtub2IuY3R4LmNyZWF0ZVBhdHRlcm4oZmxvcmFJbWcsIFwicmVwZWF0XCIpO1xuICAgICAgfVxuICAgICAga25vYi5jdHguY2xlYXJSZWN0KDAsIDAsIGtub2Iud2lkdGgsIGtub2IuaGVpZ2h0KTtcbiAgICAgIGtub2IuY3R4LmZpbGxTdHlsZSA9IGtub2IuZmxvcmFQYXR0ZXJuO1xuICAgICAga25vYi5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBrbm9iLmN0eC5tb3ZlVG8oa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyKTtcbiAgICAgIGtub2IuY3R4LmFyYyhrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCAta25vYi5QSTIsIC1rbm9iLlBJMiArIChrbm9iLlBJMiArIGtub2IuUEkyIC8gMykgKiAoa25vYi52YWx1ZSAvIGtub2IubWF4KSwgZmFsc2UpO1xuICAgICAgLy8ga25vYi5jdHguYXJjKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwga25vYi53aWR0aCAvIDIsIDAsIChrbm9iLlBJMiArIGtub2IuUEkyIC8gMykgKiAoa25vYi52YWx1ZSAvIGtub2IubWF4KSwgZmFsc2UpO1xuICAgICAgY29uc29sZS5sb2coa25vYi52YWx1ZSAvIGtub2IubWF4KVxuICAgICAga25vYi5jdHguY2xvc2VQYXRoKCk7XG4gICAgICBrbm9iLmN0eC5maWxsKCk7XG4gICAgfVxuICB9O1xuICBrbm9iLmluaXQoKTtcblxuICAkaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICRoZWFkZXIudG9nZ2xlQ2xhc3MoJ2ZpeGVkJywgJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEwKTtcblxuICAgIHZhciAkbXlFbGVtID0gJCgnI3Byb2JsZW1zJyk7XG4gICAgaWYoKCgkKHRoaXMpLnNjcm9sbFRvcCgpKSA+PSAkbXlFbGVtLm9mZnNldCgpLnRvcCkgJiYgKCEkbXlFbGVtLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkpIHtcbiAgICAgICRteUVsZW0uYWRkQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgJCh7YW5pbWF0ZWRWYWw6IGtub2IubWF4fSkuYW5pbWF0ZSh7YW5pbWF0ZWRWYWw6IGtub2IubWlufSwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgZWFzaW5nOiBcImVhc2VJbk91dFNpbmVcIixcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oKSB7IFxuICAgICAgICAgIGtub2IudmFsdWUgPSB0aGlzLmFuaW1hdGVkVmFsO1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrbm9iLmRyYXcpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgJG15RWxlbS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICB9LCA1MDAwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvd1Jlc2l6ZSgpO1xufVxuIl19
