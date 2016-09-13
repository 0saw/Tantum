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
      knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, -knob.PI2, -knob.PI2 + (knob.PI2 + knob.PI2 / 3) * (1 - knob.value / knob.max), false);
      // knob.ctx.arc(knob.width / 2, knob.width / 2, knob.width / 2, 0, (knob.PI2 + knob.PI2 / 3) * (knob.value / knob.max), false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIiwic3JjL3NjcmlwdHMvdmlld3MvZnJvbnQtcGFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKGZ1bmN0aW9uKCkge1xuICB2YXIgZnJvbnRQYWdlID0gcmVxdWlyZSgnLi92aWV3cy9mcm9udC1wYWdlJyk7XG59KTtcbiIsInZhciBpbWFnZXNTZWxlY3RvciA9IFtcbiAgXCIuZ2lybHMgaW1nXCIsXG4gIFwiLndlbGNvbWVfX2xvZ28gaW1nXCIsXG4gIFwiLmdpcmxzX19oLWJnX3JpZ2h0XCIsXG4gIFwiI2Zsb3JhXCIsXG5dLmpvaW4oJywgJyk7XG5cbnZhciBzY3JvbGxUb0VsZW1lbnRzID0gW1xuICB7IHNlbDogXCJhW2hyZWY9JyNmMCddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2YxJ11cIiwgb2Zmc2V0OiAyMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjInXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmMyddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y0J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjUnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmNiddXCIsIG9mZnNldDogMTAwIH0sXG4gIHsgc2VsOiBcImFbaHJlZj0nI2Y3J11cIiwgb2Zmc2V0OiAxMDAgfSxcbiAgeyBzZWw6IFwiYVtocmVmPScjZjgnXVwiLCBvZmZzZXQ6IDEwMCB9LFxuICB7IHNlbDogXCJhW2hyZWY9JyNmb290ZXInXVwiLCBvZmZzZXQ6IDEwMCB9XG5dO1xuXG52YXIgc2Nyb2xsVG9zID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2Nyb2xsVG9FbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICQoZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcbiAgICAgIHZhciBkZXN0aW5hdGlvbiAgPSAkKGVsZW1lbnRDbGljaylbMF0ub2Zmc2V0VG9wO1xuICAgICAgaWYoZGVzdGluYXRpb24gPCAwKSB7IGRlc3RpbmF0aW9uID0gMDsgfVxuICAgICAgY29uc29sZS5sb2coJChlbGVtZW50Q2xpY2spLCAkKGVsZW1lbnRDbGljaylbMF0ub2Zmc2V0VG9wKTtcbiAgICAgICQoJyNjb250YWluZXInKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBkZXN0aW5hdGlvbiAtIG9mZnNldCB9LCBcInNsb3dcIik7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNjcm9sbFRvRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBzY3JvbGxUb0VsZW1lbnQoc2Nyb2xsVG9FbGVtZW50c1tpXS5zZWwsIHNjcm9sbFRvRWxlbWVudHNbaV0ub2Zmc2V0KTtcbiAgfVxufTtcblxuJChpbWFnZXNTZWxlY3RvcikuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9KVxuICAuZG9uZShmdW5jdGlvbihpbnN0YW5jZSkge1xuICB9KVxuICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICBhbGVydChcItCd0LUg0LLRgdC1INC40LfQvtCx0YDQsNC20LXQvdC40Y8g0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMLiDQktC10LEt0YHRgtGA0LDQvdC40YbQsCDQvNC+0LbQtdGCINCy0YvQs9C70Y/QtNC10YLRjCDQuNGB0LrQsNC20LXQvdC90L7QuS5cIik7XG4gIH0pXG4gIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnaW1hZ2VzTG9hZGVkJyk7XG4gICAgJCgnI3ByZWxvYWRlcicpLmZhZGVPdXQoe1xuICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFNpbmUnXG4gICAgfSk7XG4gICAgZnJvbnRQYWdlKCk7XG4gICAgc2Nyb2xsVG9zKCk7XG4gIH0pO1xuXG52YXIgZnJvbnRQYWdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBoYW5kbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VsY29tZUhhbmRsZScpO1xuICB2YXIgZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnaXJsQWZ0ZXInKTtcbiAgdmFyIGdpcmxzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dpcmxzQ29udGFpbmVyJyk7XG4gIHZhciAkaGFuZGxlID0gJChoYW5kbGUpO1xuICB2YXIgJGNsb2NrID0gJChcIi5jbG9ja1wiKTtcbiAgdmFyIG1jID0gbmV3IEhhbW1lcihoYW5kbGUpO1xuICB2YXIgZW5hYmxlUGFyYWxsYXggPSBudWxsO1xuICB2YXIgZ2lybHNJbmZvID0ge1xuICAgIHg6IDBcbiAgfTtcblxuICB2YXIgd2luZG93UmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGdpcmxzSW5mby53aWR0aCA9IGdpcmxzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGdpcmxzSW5mby54ID0gMDtcbiAgICB2YXIgbmV3UGFyYWxsYXggPSAkKHdpbmRvdykud2lkdGgoKSA+IDk2MDtcbiAgICBpZiAobmV3UGFyYWxsYXggIT0gZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgIGVuYWJsZVBhcmFsbGF4ID0gbmV3UGFyYWxsYXg7XG4gICAgICBpZiAoZW5hYmxlUGFyYWxsYXgpIHtcbiAgICAgICAgcGFyYWxsYXgxLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYWxsYXgxLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBhbik7XG4gIH07XG4gICQod2luZG93KS5vbigncmVzaXplJywgd2luZG93UmVzaXplKTtcblxuICBtYy5nZXQoJ3BhbicpLnNldCh7IGRpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMIH0pO1xuXG4gIG1jLm9uKFwicGFubW92ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgZ2lybHNJbmZvLnggPSBNYXRoLm1heChNYXRoLm1pbihnaXJsc0luZm8ueE9yaWcgKyBlLmRlbHRhWCwgZ2lybHNJbmZvLndpZHRoIC8gMiksIC1naXJsc0luZm8ud2lkdGggLyAyKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcbiAgfSkub24oJ3BhbnN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgZ2lybHNJbmZvLnhPcmlnID0gZ2lybHNJbmZvLng7XG4gICAgJChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygncGFubmluZycpO1xuICB9KS5vbigncGFuZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygncGFubmluZycpO1xuICAgIC8vIGdpcmxzSW5mby54ID0gMDtcbiAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocGFuKTtcblxuICAgIC8vICQoe2FuaW1WYWw6IGdpcmxzSW5mby54fSkuYW5pbWF0ZSh7YW5pbVZhbDogMH0sIHtcbiAgICAvLyAgIGR1cmF0aW9uOiA2MDAsXG4gICAgLy8gICBlYXNpbmc6ICdlYXNlSW5PdXRTaW5lJyxcbiAgICAvLyAgIHN0ZXA6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgZ2lybHNJbmZvLnggPSB0aGlzLmFuaW1WYWw7XG4gICAgLy8gICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwYW4pO1xuICAgIC8vICAgfSxcbiAgICAvLyAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH0pO1xuXG4gIHZhciBwYW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApIHJvdGF0ZTNkKDAsIDEsIDAsICcgKyAxNSAqIE1hdGguc2luKGdpcmxzSW5mby54IC8gZ2lybHNJbmZvLndpZHRoKSArICdkZWcpJyk7XG4gICAgJGhhbmRsZS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUzZCgnICsgZ2lybHNJbmZvLnggKyAncHgsIDAsIDApJyk7XG4gICAgZ2lybC5zdHlsZS5sZWZ0ID0gZ2lybHNJbmZvLndpZHRoIC8gMiArIGdpcmxzSW5mby54ICsgJ3B4JztcbiAgfTtcblxuICB2YXIgc2NlbmUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25zU2NlbmUnKTtcbiAgdmFyIHBhcmFsbGF4MSA9IG5ldyBQYXJhbGxheChzY2VuZTEsIHtcbiAgICBjYWxpYnJhdGVYOiB0cnVlLFxuICAgIGNhbGlicmF0ZVk6IHRydWUsXG4gICAgaW52ZXJ0WDogZmFsc2UsXG4gICAgaW52ZXJ0WTogZmFsc2UsXG4gICAgbGltaXRYOiBmYWxzZSxcbiAgICBsaW1pdFk6IGZhbHNlLFxuICAgIHNjYWxhclg6IDIsXG4gICAgc2NhbGFyWTogMixcbiAgICBmcmljdGlvblg6IDAuMyxcbiAgICBmcmljdGlvblk6IDAuNSxcbiAgICBvcmlnaW5YOiAwLjUsXG4gICAgb3JpZ2luWTogMC41XG4gIH0pO1xuXG4gIHZhciBrbm9iID0ge1xuICAgIG1pbjogMCxcbiAgICBtYXg6IDIwLFxuICAgIHZhbHVlOiAyMCxcbiAgICB3aWR0aDogMjgwLFxuICAgIGhlaWdodDogMjgwLFxuICAgIFBJMjogTWF0aC5QSSAvIDIsXG4gICAgZWxlbTogbnVsbCxcbiAgICBjdHg6IG51bGwsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBrbm9iLmVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvYmxlbXNDbG9jaycpO1xuICAgICAga25vYi5jdHggPSBrbm9iLmVsZW0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGtub2IuZHJhdygpO1xuICAgIH0sXG4gICAgZHJhdzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoa25vYi5mbG9yYVBhdHRlcm4gPT0gbnVsbCkge1xuICAgICAgICB2YXIgZmxvcmFJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxvcmEnKTtcbiAgICAgICAga25vYi5mbG9yYVBhdHRlcm4gPSBrbm9iLmN0eC5jcmVhdGVQYXR0ZXJuKGZsb3JhSW1nLCBcInJlcGVhdFwiKTtcbiAgICAgIH1cbiAgICAgIGtub2IuY3R4LmNsZWFyUmVjdCgwLCAwLCBrbm9iLndpZHRoLCBrbm9iLmhlaWdodCk7XG4gICAgICBrbm9iLmN0eC5maWxsU3R5bGUgPSBrbm9iLmZsb3JhUGF0dGVybjtcbiAgICAgIGtub2IuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAga25vYi5jdHgubW92ZVRvKGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMik7XG4gICAgICBrbm9iLmN0eC5hcmMoa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwgLWtub2IuUEkyLCAta25vYi5QSTIgKyAoa25vYi5QSTIgKyBrbm9iLlBJMiAvIDMpICogKDEgLSBrbm9iLnZhbHVlIC8ga25vYi5tYXgpLCBmYWxzZSk7XG4gICAgICAvLyBrbm9iLmN0eC5hcmMoa25vYi53aWR0aCAvIDIsIGtub2Iud2lkdGggLyAyLCBrbm9iLndpZHRoIC8gMiwgMCwgKGtub2IuUEkyICsga25vYi5QSTIgLyAzKSAqIChrbm9iLnZhbHVlIC8ga25vYi5tYXgpLCBmYWxzZSk7XG4gICAgICBrbm9iLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGtub2IuY3R4LmZpbGwoKTtcbiAgICB9XG4gIH07XG4gIGtub2IuaW5pdCgpO1xuXG4gICRoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgJGhlYWRlci50b2dnbGVDbGFzcygnZml4ZWQnLCAkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTApO1xuXG4gICAgdmFyICRteUVsZW0gPSAkKCcjcHJvYmxlbXMnKTtcbiAgICBpZigoKCQodGhpcykuc2Nyb2xsVG9wKCkpID49ICRteUVsZW0ub2Zmc2V0KCkudG9wKSAmJiAoISRteUVsZW0uaGFzQ2xhc3MoJ2FuaW1hdGluZycpKSkge1xuICAgICAgJG15RWxlbS5hZGRDbGFzcygnYW5pbWF0aW5nJyk7XG4gICAgICAkKHthbmltYXRlZFZhbDoga25vYi5tYXh9KS5hbmltYXRlKHthbmltYXRlZFZhbDoga25vYi5taW59LCB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICBlYXNpbmc6IFwiZWFzZUluT3V0U2luZVwiLFxuICAgICAgICBzdGVwOiBmdW5jdGlvbigpIHsgXG4gICAgICAgICAga25vYi52YWx1ZSA9IHRoaXMuYW5pbWF0ZWRWYWw7XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtub2IuZHJhdyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBrbm9iLnZhbHVlID0gdGhpcy5hbmltYXRlZFZhbDtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa25vYi5kcmF3KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkbXlFbGVtLnJlbW92ZUNsYXNzKCdhbmltYXRpbmcnKTtcbiAgICAgIH0sIDUwMDApO1xuICAgIH1cbiAgfSk7XG5cbiAgd2luZG93UmVzaXplKCk7XG59XG4iXX0=
