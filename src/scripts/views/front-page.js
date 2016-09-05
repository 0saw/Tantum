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
