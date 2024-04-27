(function($) {
  performance.mark("sb-admin-2.js_6df44427-779a-414e-ab76-1ddbe626cb3d-start");
  "use strict";
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
  performance.mark("sb-admin-2.js_093cf541-5268-4715-a2b0-ee1205f9aa08-start");
  $("body").toggleClass("sidebar-toggled");
  $(".sidebar").toggleClass("toggled");
  if ($(".sidebar").hasClass("toggled")) {
    $('.sidebar .collapse').collapse('hide');
  }
  ;
  });
  $(window).resize(function() {
  performance.mark("sb-admin-2.js_6a942da0-fcd1-4db4-b33a-862ebd5b21b7-start");
  if ($(window).width() < 768) {
    $('.sidebar .collapse').collapse('hide');
  }
  ;
  if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
    $("body").addClass("sidebar-toggled");
    $(".sidebar").addClass("toggled");
    $('.sidebar .collapse').collapse('hide');
  }
  ;
  });
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
  performance.mark("sb-admin-2.js_503d82d6-07f8-404d-a489-97fecc8f7206-start");
  if ($(window).width() > 768) {
    var e0 = e.originalEvent, delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  }
  });
  $(document).on('scroll', function() {
  performance.mark("sb-admin-2.js_73ee0306-e43c-4a17-8350-0c132be11cf1-start");
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
  });
  $(document).on('click', 'a.scroll-to-top', function(e) {
  performance.mark("sb-admin-2.js_435602f0-16bc-4f34-a00c-bdaeb68e6bb9-start");
  var $anchor = $(this);
  $('html, body').stop().animate({
  scrollTop: ($($anchor.attr('href')).offset().top)}, 1000, 'easeInOutExpo');
  e.preventDefault();
  });
  })(jQuery);
