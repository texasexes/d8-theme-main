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
  var sideMenuSubInner = $('.side-menu__dropdown-inner');
  var mainMenuWithSub = $('.main-menu__item--with-sub');
  var mainMenuExpandSub = $('.main-menu__expand-sub');
  var sideMenuExpandSub = $('.side-menu__expand-sub');
  var mainMenuSubIcon = $('.main-menu__sub-icon');
  var sideMenuSubIcon = $('.side-menu__sub-icon');
  var header = $('.header-wrapper');
  var contentTopRegion = $('.content-top-region');
  var layoutContainer = $('.layout-container');

  // Calculated values
  var winH = parseInt(win.height(), 10);
  var winW = parseInt(win.width(), 10);
  var bodyPaddingTop = 0;
  var headerHeight = 0;
  var maxHeight = '100vh';
  var mainMenuHeight = mainMenu.outerHeight();
  var mainMenuActiveItem = $('.is-active');
  var dummyElement = $('');
  var dummyElementMaxHeight = '0';
  var currentScrollTop = 0;
  var totalHeightToSkip = 0;

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

  $('.side-menu__item--active-trail > .side-menu__expand-sub > .side-menu__sub-icon').addClass(sideMenuSubOpen);
  $('.side-menu__item--active-trail > .side-menu__dropdown').addClass(menuVisible);

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
    bodyPaddingTop = parseInt(body.css('padding-top'), 10);
  };

  // Calculate header height (to accommodate the fixed header bar)
  function calculateHeaderHeight() {
    headerHeight = 0;
    if (header.css('position') == 'fixed') {
      headerHeight = parseInt(header.css('height'), 10);
    }
  };

  function setSideMenuSubMaxHeight() {
    $(sideMenuSubInner).each(function () {
      dummyElement = $(this).clone();
      dummyElement.css({ 'visibility': 'hidden', 'position': 'absolute', 'max-height': 'unset' }).insertAfter(this);
      dummyElementMaxHeight = dummyElement.height();
      dummyElement.remove();
      $(this).closest(sideMenuSub).css({ 'max-height': dummyElementMaxHeight });
    });
  }

  // Set the height and position of the main-nav and header bar
  function calculateMenuHeights() {
    dom.ready(function () {
      winH = parseInt(win.height(), 10);
      calculateBodyPaddingTop();
      calculateHeaderHeight();
      maxHeight = winH - bodyPaddingTop;
      mainMenu.css({ 'top': bodyPaddingTop, 'max-height': maxHeight });
      header.css({ 'top': bodyPaddingTop });
      layoutContainer.css({ 'margin-top': headerHeight });
      setSideMenuSubMaxHeight();
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function () {
      winW = parseInt(win.width(), 10);
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
      // setHeaderMarginTop();
      calculateMenuHeights();
    }, 100, "Main menu - window resize");
  });

  calculateBodyPaddingTop();
  var c;

  win.scroll(function () {
    currentScrollTop = parseInt(win.scrollTop());
    if (c < currentScrollTop && currentScrollTop > bodyPaddingTop + headerHeight) {
      header.addClass("scrollUp");
    } else if (c > currentScrollTop && !(currentScrollTop <= headerHeight)) {
      header.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
