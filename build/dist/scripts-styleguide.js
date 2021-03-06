'use strict';

(function ($, Drupal) {

  var accordionHeading = $('.accordion__heading');
  var accordionContent = $('.accordion__content');
  var accordionIcon = $('.accordion__expand-icon');
  var activeClass = 'js-active';
  var hiddenClass = 'js-hidden';

  // Hide content via js so that if js is disabled, all of the content is visible
  accordionContent.addClass(hiddenClass);

  accordionHeading.click(function (e) {
    e.preventDefault();
    $(this).siblings().toggleClass(activeClass);
    $(this).siblings().toggleClass(hiddenClass);
  });
})(jQuery, Drupal);
'use strict';

(function ($, Drupal) {

  // WaitForFinalEvent Function
  // This function allow us to only perform re-calculations AFTER an event has copmleted.
  // Below, we'll use it to recalculate values only after the window has been resized, instead of recalculating every pixel change.
  // Usage:
  // $(window).resize(function () {
  //   waitForFinalEvent(function(){
  //     alert('Resize...');
  //     //...
  //   }, 500, "some unique string");
  // });
  var waitForFinalEvent = function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  }();

  // Element selectors
  var dom = $(document);
  var win = $(window);
  var body = $('body');
  var mainMenuToggle = $('.main-menu-toggle');
  var mainMenuToggleOpen = $('.main-menu-toggle--open');
  var mainMenu = $('.main-nav');
  var mainMenuSub = $('.main-menu__dropdown');
  var sideMenuSub = $('.side-menu__dropdown');
  // const mainMenuActiveItem = $('.is-active');
  var mainMenuWithSub = $('.main-menu__item--with-sub');
  var mainMenuExpandSub = $('.main-menu__expand-sub');
  var sideMenuExpandSub = $('.side-menu__expand-sub');
  var mainMenuSubIcon = $('.main-menu__sub-icon');
  var sideMenuSubIcon = $('.side-menu__sub-icon');
  var toolbar = $('.toolbar-bar');
  var header = $('.header-wrapper');

  // Calculated values
  var winH = win.height();
  var winW = win.width();
  var bodyPaddingTop = '0';
  var headerHeight = '0';
  var maxHeight = '100vh';
  var mainMenuHeight = mainMenu.outerHeight();
  var mainMenuActiveItem = $('.is-active');

  // Classes
  var mainMenuSubOpen = 'main-menu__sub-icon--open';
  var sideMenuSubOpen = 'side-menu__sub-icon--open';
  var menuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

  // Expand parent items if current page is the active menu item
  $('.main-menu__item--active-trail > .main-menu__expand-sub > .main-menu__sub-icon').addClass(mainMenuSubOpen);
  $('.main-menu__item--active-trail > .main-menu__dropdown').addClass(menuVisible);

  $('.menu-item--active-trail > .side-menu__expand-sub > .side-menu__sub-icon').addClass(sideMenuSubOpen);
  $('.menu-item--active-trail > .side-menu__dropdown').addClass(menuVisible);

  // Remove mobile nav background
  function removeMainMenuBg() {
    mainMenuBg.remove();
    mainMenuBg = '';
  }

  // Show/Hide overlay
  function mainMenuBgToggle() {
    // Prevent the background from scrolling when the mobile menu is active
    body.toggleClass(noscroll);

    // Display main menu
    mainMenu.toggleClass(menuVisible);

    //Scroll to main menu items
    mainMenuActiveItem = $('.is-active');
    if (mainMenuActiveItem.length) {
      mainMenuActiveItem.get(0).scrollIntoView();
    }

    // Remove the overlay if it exists
    if (mainMenuBg.length) {
      removeMainMenuBg();
    }
    // Add overlay if needed
    else {
        mainMenuBg = $('<span class="js-main-menu-close" />');
        mainMenuBg.css({ top: bodyPaddingTop });
        mainMenuToggleOpen.append(mainMenuBg);
      }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    mainMenuBgToggle();
    // expandParents();
  });

  // Display Sub-nav
  mainMenuExpandSub.click(function (e) {
    e.preventDefault();
    $(this).children(mainMenuSubIcon).toggleClass(mainMenuSubOpen);
    $(this).next(mainMenuSub).toggleClass(menuVisible);
  });
  // Display Sub-nav
  sideMenuExpandSub.click(function (e) {
    e.preventDefault();
    $(this).children(sideMenuSubIcon).toggleClass(sideMenuSubOpen);
    $(this).next(sideMenuSub).toggleClass(menuVisible);
  });

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyPaddingTop() {
    bodyPaddingTop = parseInt(body.css('padding-top'));
  };

  // Calculate header height (to accommodate the fixed header bar)
  function calculateHeaderHeight() {
    headerHeight = parseInt(header.css('height'));
  };

  // Set the height and position of the main-nav and header bar
  function calculateMenuHeights() {
    dom.ready(function () {
      winH = win.height();
      calculateBodyPaddingTop();
      calculateHeaderHeight();
      maxHeight = winH - bodyPaddingTop;
      mainMenu.css({ 'top': bodyPaddingTop, 'max-height': maxHeight });
      header.css({ 'top': bodyPaddingTop });
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function () {
      winW = win.width();
      // If desktop width remove all mobile menu stuff
      if (winW > 900) {
        // Remove background overlay
        if (mainMenuBg.length) {
          removeMainMenuBg();
        }
        // Remove noscroll class from body
        body.removeClass(noscroll);
        // Hide mobile menu
        mainMenu.removeClass(menuVisible);
      }

      calculateMenuHeights();
    }, 100, "Main menu - window resize");
  });

  // Hide heading bar on scroll down, show on scroll up
  var c,
      currentScrollTop = 0;
  win.scroll(function () {
    var currentScrollTop = win.scrollTop();
    var b = header.height();

    if (c < currentScrollTop && currentScrollTop > b + b) {
      header.addClass("scrollUp");
    } else if (c > currentScrollTop && !(currentScrollTop <= b)) {
      header.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
