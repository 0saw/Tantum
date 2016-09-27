(function () {
  var $header = $('.header');
  var $logo = $header.find('.header__logo');
  var height = $logo.outerHeight();
  var isFixed = false;

  var scrollFun = function () {
    var scrollTop = $(window).scrollTop();

    if ((isFixed && (scrollTop > height)) || (!isFixed && (scrollTop <= height))) {
      return;
    }

    if (scrollTop > height) {
      $header.css('transform', "translate3d(0, -" + $logo.outerHeight() + "px, 0)");
      $('header').addClass('fixed');
      isFixed = true;
    } else {
      $header.css('transform', "none");
      $('header').removeClass('fixed');
      isFixed = false;
    }
  }

  $(window).on('scroll', scrollFun);
  $(window).on('resize', function () {
    height = $logo.outerHeight();
    scrollFun();
  });
  $(document).ready(scrollFun);

})();
