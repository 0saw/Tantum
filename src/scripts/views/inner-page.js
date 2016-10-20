(function () {
  // var $header = $('.header');
  // var $logo = $header.find('.header__logo');
  // var height = $logo.outerHeight();
  // var isFixed = false;

  // var scrollFun = function () {
  //   var scrollTop = $(window).scrollTop();

  //   if ((isFixed && (scrollTop > height)) || (!isFixed && (scrollTop <= height))) {
  //     return;
  //   }

  //   if (scrollTop > height) {
  //     $header.css('transform', "translate3d(0, -" + $logo.outerHeight() + "px, 0)");
  //     $('header').addClass('fixed');
  //     isFixed = true;
  //   } else {
  //     $header.css('transform', "none");
  //     $('header').removeClass('fixed');
  //     isFixed = false;
  //   }
  // }

  // $(window).on('scroll', scrollFun);
  // $(window).on('resize', function () {
  //   height = $logo.outerHeight();
  //   scrollFun();
  // });
  // $(document).ready(scrollFun);
  $('a[href="#format-advice"]').on('click', function (e) {
    e.preventDefault();
    document.openForm('#format-advice');
  });
})();

document.openForm = function(selector) {
    if (selector == null) {
      selector = ".form form:eq(1)";
    }
    return $.magnificPopup.open({
      items: {
        src: $(selector),
        type: 'inline'
      },
      removalDelay: 500,
      mainClass: 'mfp-zoom-in modal',
      callbacks: {
        beforeOpen: function() {}
      },
      midClick: true
    });
  };
