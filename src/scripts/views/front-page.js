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
