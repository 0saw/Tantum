$(function() {
  var enableParallax = null;
  var helperItems = [];

  $('form').submit(function(){
    var required = $('[required="true"]'); // change to [required] if not using true option as part of the attribute as it is not really needed.
    var error = false;

    for(var i = 0; i <= (required.length - 1); i++) {
      if(required[i].value == '') { // tests that each required value does not equal blank, you could put in more stringent checks here if you wish.
        required[i].style.backgroundColor = 'rgb(255,155,155)';
        error = true; // if any inputs fail validation then the error variable will be set to true;     
      }
    }
    // if error is true;
    if(error) {
      return false; // stop the form from being submitted.
    }
  });

  $('.literature').on('click', function (e) {
    $('.footer__legal .footer__cont').show();
  });
  $('.readMoreFooter').on('click', function (e) {
    e.preventDefault();
    $('.footer__legal .footer__cont').slideToggle();
  });

  $('.pdSlide').each(function (e) {
    helperItems.push({
      elem: this,
      toggled: false,
      text: $(this).find('.pdSlide__info'),
    });
  }).on('click', function (e) {
    $this = $(this);
    var item = $.grep(helperItems, function (elem) {
      return elem.elem == $this[0];
    });
    if (typeof item[0] != 'undefined') {
      item[0].toggled = true;
      item[0].text.slideToggle();
    }
  });

  function toggleHelpers(show, anim) {
    if (typeof anim === 'undefined') {
      anim = true;
    }
    $.each(helperItems, function (index, elem) {
      if (show) {
        elem.text.slideDown();
      } else {
        elem.text.slideUp();
      }
    });
  };
  if (($(window).height() < 750) || ($(window).width() <= 960)) {
    $.each(helperItems, function (index, elem) {
      elem.text.hide();
    });
  } else {
    $.each(helperItems, function (index, elem) {
      elem.text.show();
    });
  }

  var windowResize = function () {
    var newParallax = $(window).width() > 960;
    if (newParallax != enableParallax) {
      enableParallax = newParallax;
      if (enableParallax) {
        toggleHelpers(true);
      } else {
        toggleHelpers(false);
      }
    }
  };
  $(window).on('resize', windowResize);

  $('.filter input[type="radio"], .filter select, .toexperts__field  input[type="radio"]').styler();

  var page = $(document.body).hasClass('front');
  page = page ? 'front' : '';
  page = ($('.header__logo').length > 0) ? 'inner' : page;
  switch (page) {
    case 'front':
      var frontPage = require('./views/front-page');
      break;
    case 'inner':
      var innerPage = require('./views/inner-page');
      break;
    default:
      break;
  }
  console.log(page);
});
